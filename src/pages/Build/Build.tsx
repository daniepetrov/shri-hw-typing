import BuildLog from '@/pages/Build/BuildLog'
import BuildCard from '@/shared/components/composite/BuildCard'
import ErrorDummy from '@/shared/components/composite/ErrorDummy'
import { Container, Spinner, VStack } from '@/shared/components/ui'
import { useBuildDetails, useBuildLog } from '@/shared/services/hooks'
import { hashAtom } from '@/shared/store'
import { IApiBuildData } from '@/types/api'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

interface BuildPageParams {
  id: string
}

export default function BuildPage() {
  const { id }: BuildPageParams = useParams()
  const [, setCurrentHash] = useAtom(hashAtom)
  const {data: buildDetails, isError, isLoading, error} = useBuildDetails(id, {
    onSuccess: (details: { commitHash: string  }) => {
      setCurrentHash(details.commitHash)
    },
  })
  const {
    data: buildLog,
    isLoading: isLoadingLog,
    isError: isErrorLog,
    error: errorLog,
    isSuccess,
    refetch,
  } = useBuildLog(id)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (buildLog?.trim() === '') {
      interval = setInterval(() => {
        refetch()
      }, 2000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [buildLog])

  if (isLoading || isLoadingLog) {
    return <Spinner />
  }

  if(isError) {
    return <ErrorDummy error={{ text: error?.message, buttonText: 'Try again' }} />
  }
  if(isErrorLog) {
    return <ErrorDummy error={{ text: errorLog?.message, buttonText: 'Try again' }} />
  }

  return (
        <Container>
          {
            <VStack spacing={12}>
              <BuildCard variant="wide" {...buildDetails as IApiBuildData} />
              <BuildLog>
                {(isLoadingLog || (isSuccess && buildLog?.trim() === '')) && <Spinner />}
                {isSuccess && buildLog?.trim()}
              </BuildLog>
            </VStack>
          }
        </Container>
  )
}
