const fs = require('fs').promises
function isAccessible(path) {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false)
}

module.exports = { isAccessible }
