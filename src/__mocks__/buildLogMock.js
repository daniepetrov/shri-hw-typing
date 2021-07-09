const buildLogMock = `
audited 1438 packages in 4.272s

73 packages are looking for funding
  run npm fund for details

found 91 vulnerabilities (88 moderate, 3 high)
  run npm audit fix to fix them, or npm audit for details

> express-static-app@1.0.0 build /home/hookydev/workspace/projects/learning/shri/homeworks/shri-hw-bundling/tmp/repository
> cross-env NODE_ENV=production webpack --config config/webpack.prod.js

assets by path images/ 234 KiB 32 assets
assets by path *.png 125 KiB 16 assets
assets by path *.ttf 501 KiB 3 assets
assets by path fonts/*.ttf 501 KiB 3 assets
assets by chunk 52.9 KiB (name: main)
  asset stories.css 39.1 KiB [emitted] [minimized] (name: main)
  asset stories.js 13.9 KiB [emitted] [minimized] (name: main)
assets by path *.ico 65.1 KiB
  asset favicon-dark.ico 32.5 KiB [emitted] [from: public/favicon-dark.ico] [copied]
  asset favicon-light.ico 32.5 KiB [emitted] [from: public/favicon-light.ico] [copied]
assets by path *.svg 14 KiB
  asset f225a93863e83084c24c.svg 7.58 KiB [emitted] [immutable] [from: public/images/svg/diagram-dark.svg] (auxiliary name: main)
  asset 40ab068c561f5eb22f2e.svg 6.42 KiB [emitted] [immutable] [from: public/images/svg/diagram-light.svg] (auxiliary name: main)
asset data/data.json 12.4 KiB [emitted] [from: public/data/data.json] [copied]
Entrypoint main 52.9 KiB (630 KiB) = stories.css 39.1 KiB stories.js 13.9 KiB 15 auxiliary assets
orphan modules 19.1 KiB [orphan] 8 modules
code generated modules 19.1 KiB (javascript) 40.7 KiB (css/mini-extract) [code generated]
  ./src/index.js + 7 modules 19.1 KiB [built] [code generated]
  css ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/index.scss 40.7 KiB [code generated]
1 WARNING in child compilations (Use 'stats.children: true' resp. '--stats-children' for more details)
webpack 5.27.1 compiled with 1 warning in 2877 ms
`
export default buildLogMock
