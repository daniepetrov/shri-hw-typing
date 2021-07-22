import { Button, Container, HStack, TextField, VStack } from '@/shared/components/ui'
import NumberField from '@/shared/components/ui/NumberField'
import { useGetSettings, useSetSettings } from '@/shared/services/hooks'
import { isEmpty } from '@/shared/utils/common'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import s from './Settings.module.scss'

const initialFormState = {
  repoName: '',
  buildCommand: '',
  mainBranch: '',
  period: '',
}

export default function SettingsPage() {
  const history = useHistory()
  const { data: settings } = useGetSettings()
  const { isLoading, mutateAsync, error: murationError } = useSetSettings()
  const [form, setForm] = useState(initialFormState)

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const re = /\D/
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      period: e.target.name === 'period' ? e.target.value.replace(re, '') : form.period,
    })
  }

  const goBack = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    history.push('/')
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    await mutateAsync(form)
    history.push('/')
  }

  const handleReset = (name: string) =>
    setForm({
      ...form,
      [name]: '',
    })

  useEffect(() => {
    if (!isEmpty(settings)) {
      setForm(settings.data)
    }
  }, [settings])

  return (
    <Container height="100%">
      <div className={s.root}>
        <div className={s.configurer}>
          <form onSubmit={handleSubmit} className={s.form} data-testid="settings-form">
            <VStack spacing={28}>
              <div className={s.header}>
                <div data-testid="settings-heading" className={s.heading}>
                  Settings
                </div>
                <div className={s.subheading}></div>
                Configure repository connection and synchronization settings.
              </div>
              <VStack spacing={20}>
                <TextField
                  type="text"
                  name="repoName"
                  value={form.repoName}
                  onChange={handleChange}
                  onReset={() => handleReset('repoName')}
                  placeholder="user-name/repo-name"
                  label="GitHub repository"
                  required
                />
                <TextField
                  type="text"
                  name="buildCommand"
                  value={form.buildCommand}
                  onChange={handleChange}
                  onReset={() => handleReset('buildCommand')}
                  placeholder="npm ci && npm run build"
                  label="Build command"
                  required
                />
                <TextField
                  type="text"
                  name="mainBranch"
                  value={form.mainBranch}
                  onChange={handleChange}
                  onReset={() => handleReset('mainBranch')}
                  placeholder="master"
                  label="Main branch"
                />
                <HStack spacing={8} alignItems="center" inline>
                  <span>Synchronize every</span>
                  <NumberField
                    type="text"
                    name="period"
                    value={form.period}
                    onChange={handleChange}
                    placeholder="10"
                  />
                  <span>minutes</span>
                </HStack>
              </VStack>
              <div className={s.footer}>
                <Button type="submit" disabled={isLoading}>
                  Save
                </Button>
                <Button onClick={goBack} variant="secondary" disabled={isLoading}>
                  Cancel
                </Button>
              </div>
              {murationError && <div className={s.formError}>Failed to clone repository</div>}
            </VStack>
          </form>
        </div>
      </div>
    </Container>
  )
}
