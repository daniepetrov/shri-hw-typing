import util from 'util'
import { exec as execCb } from 'child_process'
import path from 'path'

const exec = util.promisify(execCb)

const getBuildLog = async (buildCommand: string): Promise<string> => {
  const { stdout, stderr } = await exec(`${buildCommand}`, {
    cwd: path.resolve('./tmp/repository'),
  })

  if (stderr) {
    console.log(stderr)
  }

  console.log(stdout)
  console.log('...Build completed')
  return stdout
}

export { getBuildLog }
