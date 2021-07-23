import BuildCard from '../../../shared/components/composite/BuildCard'
import s from './BuildList.module.scss'
import { Button, Spinner, VStack } from '@/shared/components/ui'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useBuilds } from '@/shared/services/hooks'
import ErrorDummy from '@/shared/components/composite/ErrorDummy'
import { IApiBuildData } from '@/types/api'

export default function BuildList(): JSX.Element {
  const [offset, setOffset] = useState(0)
  const { data: builds, isLoading, isError, error } = useBuilds(offset)
  const [realBuilds, setRealBuils] = useState<IApiBuildData[]>([])

  useEffect(() => {
    if (builds) {
      setRealBuils((data) => data.concat(builds))
    }
  }, [builds])

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <ErrorDummy error={{ text: error?.message, buttonText: 'Try again' }} />
  }

  return (
    <VStack spacing={8}>
      {realBuilds?.map((buildDetails) => {
        return (
          <Link key={buildDetails.id} to={`/build/${buildDetails.id}`}>
            <BuildCard {...buildDetails} />
          </Link>
        )
      })}
      <div className={s.buttonWrapper}>
        <Button onClick={() => setOffset((s) => s + 25)} variant="secondary">
          Show more
        </Button>
      </div>
    </VStack>
  )
}
