const { promises: fs } = require('fs')
const path = require('path')

const { validate } = require('schema-utils')

// schema for options object
const schema = {
  type: 'object',
  properties: {
    outputFile: {
      description: 'Name of the output file',
      type: 'string',
    },
    srcPath: {
      description: 'Path to src directory',
      type: 'string',
    },
    excludeStr: {
      description: 'Exlude by string match',
      type: 'string',
    },
  },
}

class UnusedModulesWebpackPlugin {
  static defaultOptions = {
    outputFile: 'unused.json',
    srcPath: './src',
    excludeStr: ''
  }

  constructor(options = {}) {
    validate(schema, options, {
      name: 'UnusedModulesWebpackPlugin',
      baseDataPath: 'options',
    })
    this.options = { ...UnusedModulesWebpackPlugin.defaultOptions, ...options }
  }

  apply(compiler) {
    const usedModules = []
    const strip = path.resolve(this.options.srcPath)

    compiler.hooks.normalModuleFactory.tap('UnusedModulesWebpackPlugin', (normalModuleFactory) => {
      normalModuleFactory.hooks.module.tap('UnusedModulesWebpackPlugin', (_, createData) => {
        if (!createData.resource.includes('node_modules')) {
          usedModules.push(createData.resource.replace(strip + '/', ''))
        }
      })
    })

    compiler.hooks.done.tap('UnusedModulesWebpackPlugin', async () => {
      try {
        const allModules = await getFiles(this.options.srcPath + '/')
        const unusedModules = await allModules
          .filter((module) =>
            this.options.excludeStr ? !module.includes(this.options.excludeStr) : module,
          )
          .map((module) => module.replace(strip + '/', ''))
          .filter((module) => !usedModules.includes(module))
        await fs.writeFile(this.options.outputFile, JSON.stringify(unusedModules, null, 2))
      } catch (err) {
        console.log(err)
      }
    })
  }
}

module.exports = UnusedModulesWebpackPlugin

async function getFiles(pathSrc) {
  const entries = await fs.readdir(pathSrc, { withFileTypes: true })
  const files = entries
    .filter((file) => !file.isDirectory())
    .map((file) => path.resolve(pathSrc, file.name))

  const folders = entries.filter((folder) => folder.isDirectory())

  for (const folder of folders) {
    files.push(...(await getFiles(`${pathSrc}${folder.name}/`)))
  }

  return files
}
