require('dotenv').config()
const express = require('express')
const fallback = require('express-history-api-fallback')
const axios = require('axios')
const path = require('path')
// const apicache = require('apicache')
const cors = require('cors')
const { getCommitInfoByHash, getBranchByCommitHash, cloneRepo } = require('./utils/git')
const { getBuildLog } = require('./utils/build')
const Convert = require('ansi-to-html')

const { PORT, API } = require('./config')
const app = express()
const convert = new Convert()

if (!process.env.AUTH_TOKEN) {
  console.error('Error: Please, add AUTH_TOKEN env variable to .env file')
}

const headers = {
  Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
}

app.use(cors())
app.use(express.json())

const publicPath = path.resolve(__dirname, '../build')
app.use(express.static(publicPath))
app.use('/settings', express.static(publicPath))
app.use('/build/*', express.static(publicPath))


app.get('/api/settings', async (req, res) => {
  const response = await axios.get(`${API}/conf`, { headers })
  return res.json(response.data)
})

app.post('/api/settings', async (req, res) => {
  try {
    await cloneRepo(req.body.repoName)
    await axios.post(`${API}/conf`, req.body, { headers })
    return res.status(200).json({ success: true })
  } catch (err) {
    res.status(404).json({ message: 'Не удалось склонировать репозиторий' })
  }
})

app.get('/api/builds', async (req, res) => {
  const response = await axios.get(`${API}/build/list`, {
    headers,
    params: { offset: req.query.offset },
  })
  return res.status(200).json(response.data)
})

app.post('/api/builds/:commitHash', async (req, res) => {
  // Получаем настройки
  const settingsRes = await axios.get(`${API}/conf`, { headers })
  const { buildCommand } = await settingsRes.data.data

  // Получаем параметры для POST-запроса на добавление сборки в очередь
  const commitHash = req.params.commitHash
  try {
    const [authorName, commitMessage] = await getCommitInfoByHash(commitHash)
    const branchName = await getBranchByCommitHash(commitHash)
    const body = { commitMessage, commitHash, branchName, authorName }

    // Делаем запрос на добавление сборки в очередь
    const buildRes = await axios.post(`${API}/build/request`, body, { headers })
    const { id: buildId } = await buildRes.data.data
    res.status(200).json(buildRes.data)

    const dateTime = new Date()
    // Отсылаем запрос на сервер, что начали собирать сборку
    await axios.post(
      `${API}/build/start`,
      { buildId, dateTime: dateTime.toISOString() },
      { headers },
    )

    // Начинаем собирать сборку
    const buildLog = await getBuildLog(buildCommand)

    // По окончании сборки отсылаем запрос на сервер о завершении
    await axios.post(
      `${API}/build/finish`,
      {
        buildId,
        duration: ((new Date() - dateTime) / 1000).toFixed(),
        success: true,
        buildLog: convert.toHtml(buildLog),
      },
      { headers },
    )
  } catch (err) {
    res.status(404).json({ message: 'Введен несуществующий коммит' })
  }
})

app.get('/api/builds/:buildId', async (req, res) => {
  const buildId = req.params.buildId
  const response = await axios.get(`${API}/build/details`, { headers, params: { buildId } })
  return res.json(response.data)
})

app.get('/api/builds/:buildId/logs', async (req, res) => {
  const buildId = req.params.buildId
  const response = await axios.get(`${API}/build/log`, { headers, params: { buildId } })
  return res.send(response.data)
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
