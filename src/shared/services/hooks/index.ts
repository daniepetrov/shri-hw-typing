import { IApiBuildData, IApiBuildRequestData, IApiConfGetData, IApiConfPostData } from '@/types/api'
import { useMutation, UseMutationResult, useQuery, UseQueryOptions, UseQueryResult } from 'react-query'
import { getSettings, saveSettings, getBuilds, getBuildDetails, getBuildLog, createBuild } from '../api'

export const useGetSettings = (): UseQueryResult<IApiConfGetData, Error> => {
  return useQuery('settings', getSettings)
}

export const useSetSettings = (): UseMutationResult<void, Error, IApiConfPostData> => {
  return useMutation(saveSettings)
}

export const useBuilds = (offset: number): UseQueryResult<IApiBuildData[], Error> => {
  return useQuery(
    ['builds', offset],
    () => getBuilds(offset),
    {
      keepPreviousData: true,
    },
  )
}

export const useBuildDetails = (id: string, params: UseQueryOptions<IApiBuildData, Error>): UseQueryResult<IApiBuildData, Error> => {
  return useQuery(
    ['buildDetails', id],
    () => getBuildDetails(id),
    params,
  )
}

export const useBuildLog = (id: string): UseQueryResult<string, Error> => {
  return useQuery(['buildLog', id], () =>
    getBuildLog(id),
  )
}

export const useCreateBuild = (): UseMutationResult<IApiBuildRequestData, Error, string> => {
  return useMutation(createBuild)
}