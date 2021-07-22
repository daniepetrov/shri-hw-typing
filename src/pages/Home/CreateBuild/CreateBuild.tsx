import { Button, HStack, TextField, VStack } from '@/shared/components/ui'
import { createBuild } from '@/shared/services/api'
import { modalAtom } from '@/shared/store'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'
import s from './CreateBuild.module.scss'

const CreateBuild = () => {
  const [hash, setHash] = useState('')
  const [, setIsModalOpened] = useAtom(modalAtom)
  const history = useHistory()
  const { mutateAsync, error } = useMutation(createBuild)

  const handleChange = (e) => {
    setHash(e.target.value)
  }

  const handleReset = () => {
    setHash('')
  }

  const handleClose = () => {
    setIsModalOpened(false)
  }

  const runBuild = async (hash: string) => {
    const { data } = await mutateAsync(hash)
    handleClose()
    history.push(`/build/${data.id}`)
  }

  return (
    <div className={s.root}>
      <VStack spacing={12}>
        <div className={s.heading}>New build</div>
        <div className={s.subheading}>Enter the commit hash which you want to build.</div>
        <TextField
          type="text"
          value={hash}
          error={error?.message}
          onChange={handleChange}
          onReset={handleReset}
          placeholder="Commit hash"
        />
        <HStack spacing={10} inline>
          <Button onClick={() => runBuild(hash)}>Run build</Button>
          <Button onClick={handleClose} variant="clear">
            Cancel
          </Button>
        </HStack>
      </VStack>
    </div>
  )
}

export default CreateBuild
