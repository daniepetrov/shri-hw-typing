import { IApiBuildData, IApiConfGetData, IApiConfPostData, IApiBuildRequestData } from '@/types/api'
import axios from 'axios'

const API_URL = process.env.API_URL || '/api'

export const getSettings = async (): Promise<IApiConfGetData> => {
  const res = await axios.get(`${API_URL}/settings`)

  if (res.statusText !== 'OK') {
    throw new Error('Something went wrong')
  }
  return res.data?.data
}

export const saveSettings = async (data: IApiConfPostData): Promise<void> => {
  const res = await axios.post(`${API_URL}/settings`, data)

  if (res.statusText !== 'OK') {
    throw new Error('Something went wrong')
  }
}

export const getBuilds = async (offset = 0): Promise<IApiBuildData[]> => {
  const res = await axios.get(`${API_URL}/builds?offset=${offset}`)

  if (res.statusText !== 'OK') {
    throw new Error('Something went wrong')
  }
  return res.data?.data
}

export const getBuildLog = async (buildId: string): Promise<string> => {
  const res = await axios.get(`${API_URL}/builds/${buildId}/logs`)
  if (res.statusText !== 'OK') {
    throw new Error('Something went wrong')
  }
  return res.data
}

export const getBuildDetails = async (buildId: string): Promise<IApiBuildData> => {
  const res = await axios.get(`${API_URL}/builds/${buildId}`)
  if (res.statusText !== 'OK') {
    throw new Error('Something went wrong')
  }
  return res.data?.data
}

export const createBuild = async (hash: string): Promise<IApiBuildRequestData> => {
  const res = await axios.post(`${API_URL}/builds/${hash}`)
  if (res.statusText !== 'OK') {
    throw new Error('Something went wrong')
  }
  return res.data?.data
}

