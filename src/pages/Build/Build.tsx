import BuildLog from '@/pages/Build/BuildLog'
import BuildCard from '@/shared/components/composite/BuildCard'
import ErrorDummy from '@/shared/components/composite/ErrorDummy'
import { Container, Spinner, VStack } from '@/shared/components/ui'
import { useBuildDetails, useBuildLog } from '@/shared/services/hooks'
import { hashAtom } from '@/shared/store'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function BuildPage() {
  const { id } = useParams()
  const [, setCurrentHash] = useAtom(hashAtom)
  const {data: buildDetails, isError, isLoading, error} = useBuildDetails(id, {
    onSuccess: (details: { data: { commitHash: unknown } }) => {
      setCurrentHash(details.data.commitHash)
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
    let interval: number | Timer | Timer | Timer | Timer | Timer | Timer | Timer | Timer | Timer | Timer | Timer | Timer | Timer
    if (buildLog?.trim() === '') {
      interval = setInterval(() => {
        refetch()
      }, 2000)
    } else {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [buildLog])

  if (isLoading || isLoadingLog) {
    return <Spinner />
  }

  if(isError) {
    return <ErrorDummy error={{ text: error.message, buttonText: 'Try again' }} />
  }
  if(isErrorLog) {
    return <ErrorDummy error={{ text: errorLog.message, buttonText: 'Try again' }} />
  }

  return (
        <Container>
          {
            <VStack spacing={12}>
              <BuildCard variant="wide" {...buildDetails.data} />
              <BuildLog>
                {(isLoadingLog || (isSuccess && buildLog.trim() === '')) && <Spinner />}
                {isSuccess && buildLog.trim()}
              </BuildLog>
            </VStack>
          }
        </Container>
  )
}
