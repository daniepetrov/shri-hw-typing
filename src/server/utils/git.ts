import path from 'path'
import util from 'util'
import { exec as execOld } from 'child_process'
const exec = util.promisify(execOld)
import { isAccessible } from './common'

const getCommitInfoByHash = async (hash: string): Promise<string[]> => {
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
    return []
  }
}

const getBranchByCommitHash = async (hash: string): Promise<string | undefined> => {
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

const cloneRepo = async (repoName: string): Promise<void> => {
  const repoDir = path.resolve(`./tmp/repository`)

  if (await isAccessible(repoDir)) {
    await exec(`rm -rf ${repoDir}`)
  }
  console.log(`...Cloning git@github.com:${repoName}.git to tmp/repository`)
  await exec(`git clone git@github.com:${repoName}.git repository`, {
    cwd: path.resolve('./tmp'),
  })
}
export { getBranchByCommitHash, getCommitInfoByHash, cloneRepo }
