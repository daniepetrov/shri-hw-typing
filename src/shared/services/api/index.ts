import { IApiConfGetData, IApiConfPostData } from '@/types/api'
import axios from 'axios'

const API_URL = process.env.API_URL || '/api'

export const getSettings = async (): Promise<IApiConfGetData> => {
  const res = await axios.get(`${API_URL}/settings`)

  if (res.statusText !== 'OK') {
    throw new Error('Something went wrong')
  }
  return res.data
}

export const saveSettings = async (data: IApiConfPostData) => {
  const res = await axios.post(`${API_URL}/settings`, data)

  if (res.statusText !== 'OK') {
    throw new Error('Something went wrong')
  }
  return res.data
}

export const getBuilds = async (offset = 0) => {
  const res = await axios.get(`${API_URL}/builds?offset=${offset}`)

  if (res.statusText !== 'OK') {
    throw new Error('Something went wrong')
  }
  return res.data
}

export const getBuildLog = async (buildId) => {
  const res = await axios.get(`${API_URL}/builds/${buildId}/logs`)
  if (res.statusText !== 'OK') {
    throw new Error('Something went wrong')
  }
  return res.data
}

export const getBuildDetails = async (buildId) => {
  const res = await axios.get(`${API_URL}/builds/${buildId}`)
  if (res.statusText !== 'OK') {
    throw new Error('Something went wrong')
  }
  return res.data
}

export const createBuild = async (hash) => {
  const res = await axios.post(`${API_URL}/builds/${hash}`)
  if (res.statusText !== 'OK') {
    throw new Error('Something went wrong')
  }
  return res.data
}

// export const Api = {
//   async getSettings() {
//     const res = await axios.get(`${API_URL}/settings`)

//     if (res.statusText !== 'OK') {
//       throw new Error('Something went wrong')
//     }
//     return res.data
//   },

//   async saveSettings(data) {
//     const res = await axios.post(`${API_URL}/settings`, data)

//     if (res.statusText !== 'OK') {
//       throw new Error('Something went wrong')
//     }
//     return res.data
//   },

//   async getBuilds(offset) {
//     const res = await axios.get(`${API_URL}/builds?offset=${offset}`)

//     if (res.statusText !== 'OK') {
//       throw new Error('Something went wrong')
//     }
//     return res.data
//   },

//   async getBuildLog(buildId) {
//     const res = await axios.get(`${API_URL}/builds/${buildId}/logs`)
//     if (res.statusText !== 'OK') {
//       throw new Error('Something went wrong')
//     }
//     return res.data
//   },

//   async getBuildDetails(buildId) {
//     const res = await axios.get(`${API_URL}/builds/${buildId}`)
//     if (res.statusText !== 'OK') {
//       throw new Error('Something went wrong')
//     }
//     return res.data
//   },

//   async createBuild(hash) {
//     const res = await axios.post(`${API_URL}/builds/${hash}`)
//     if (res.statusText !== 'OK') {
//       throw new Error('Something went wrong')
//     }
//     return res.data
//   },
// }
