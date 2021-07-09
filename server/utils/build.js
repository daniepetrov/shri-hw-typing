const util = require('util')
const exec = util.promisify(require('child_process').exec)
const path = require('path')

const getBuildLog = async (buildCommand) => {
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

module.exports = { getBuildLog }
