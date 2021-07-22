import { promises as fs } from 'fs'

function isAccessible(path: string): Promise<boolean> {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false)
}
export { isAccessible }
