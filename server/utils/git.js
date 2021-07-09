const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const { isAccessible } = require('./common')

const getCommitInfoByHash = async (hash) => {
  try {
    const { stdout } = await exec(`git log -1 --format="%an,%B" ${hash}`, {
      cwd: path.resolve('./tmp/repository'),
    })

    return stdout
      .toString()
      .split(',')
      .map((item) => item.replace(/\n/, '').trim())
  } catch (error) {
    console.log(`Status Code: ${error.status} with '${error.message}'`)
  }
}

const getBranchByCommitHash = async (hash) => {
  try {
    const { stdout } = await exec(`git branch -r --contains ${hash}`, {
      cwd: path.resolve('./tmp/repository'),
    })

    return stdout
      .toString()
      .split(/\r?\n/)
      .map((item) => item.replace(/\n/, '').trim())
      .filter(Boolean)
      .map((item) => item.substring(item.lastIndexOf('/') + 1, item.length))[0]
  } catch (error) {
    console.log(`Status Code: ${error.status} with '${error.message}'`)
  }
}

const cloneRepo = async (repoName) => {
  const repoDir = path.resolve(`./tmp/repository`)

  if (await isAccessible(repoDir)) {
    await exec(`rm -rf ${repoDir}`)
  }
  console.log(`...Cloning git@github.com:${repoName}.git to tmp/repository`)
  await exec(`git clone git@github.com:${repoName}.git repository`, {
    cwd: path.resolve('./tmp'),
  })
}

module.exports = { getBranchByCommitHash, getCommitInfoByHash, cloneRepo }
