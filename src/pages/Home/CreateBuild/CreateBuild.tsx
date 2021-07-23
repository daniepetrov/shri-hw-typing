import { Button, HStack, TextField, VStack } from '@/shared/components/ui'
import { useCreateBuild } from '@/shared/services/hooks'
import { modalAtom } from '@/shared/store'
import { useAtom } from 'jotai'
import { ChangeEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import s from './CreateBuild.module.scss'

const CreateBuild = (): JSX.Element => {
  const [hash, setHash] = useState('')
  const [, setIsModalOpened] = useAtom(modalAtom)
  const history = useHistory()
  const { mutateAsync, error } = useCreateBuild()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setHash(e.target.value)
  }

  const handleReset = (): void => {
    setHash('')
  }

  const handleClose = (): void => {
    setIsModalOpened(false)
  }

  const runBuild = async (hash: string) => {
    const { id } = await mutateAsync(hash)
    handleClose()
    history.push(`/build/${id}`)
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
