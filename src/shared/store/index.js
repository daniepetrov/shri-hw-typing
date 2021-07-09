const { atom } = require('jotai')

const settingsAtom = atom({})
const modalAtom = atom(false)
const hashAtom = atom('')

export { settingsAtom, modalAtom, hashAtom }
