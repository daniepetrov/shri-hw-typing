import { useMutation, useQuery, UseQueryOptions } from 'react-query'
import { getSettings, saveSettings, getBuilds, getBuildDetails, getBuildLog } from '../api'

export const useGetSettings = () => {
  const { data, error, isLoading, isError } = useQuery('settings', getSettings)
  return { data, error, isLoading, isError }
}

export const useSetSettings = () => {
  const { mutateAsync, isLoading: isMutating, error } = useMutation(saveSettings)

  return { mutateAsync, isMutating, error }
}

export const useBuilds = (offset: number) => {
  const { data, isLoading, error, isError } = useQuery(
    ['builds', offset],
    () => getBuilds(offset),
    {
      keepPreviousData: true,
    },
  )

  return { data, isLoading, error, isError }
}

export const useBuildDetails = (id, params: UseQueryOptions<any,unknown,any,any[]>) => {
  const { data, isLoading, isError, error } = useQuery(
    ['buildDetails', id],
    () => getBuildDetails(id),
    params,
  )

  return { data, isLoading, isError, error }
}

export const useBuildLog = (id) => {
  const { data, isLoading, isSuccess, isError, error, refetch } = useQuery(['buildLog', id], () =>
    getBuildLog(id),
  )

  return { data, isLoading, isError, isSuccess, refetch }
}
