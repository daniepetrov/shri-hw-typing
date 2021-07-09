import {
  useBuildDetails,
  useBuildLog,
  useBuilds,
  useGetSettings,
  useSetSettings,
} from '@/shared/services/hooks'
import { fireEvent, screen } from '@testing-library/react'
import App from './App'
import buildCardMock from './__mocks__/buildCardMock'
import buildLogMock from './__mocks__/buildLogMock'
import buildsMock from './__mocks__/buildsMock'
import settingsMock from './__mocks__/settingsMock'

jest.mock('@/shared/services/hooks', () => {
  const original = jest.requireActual('@/shared/services/hooks')
  return {
    ...original,
    useGetSettings: jest.fn(),
    useSetSettings: jest.fn(),
    useBuilds: jest.fn(),
    useBuildDetails: jest.fn(),
    useBuildLog: jest.fn(),
  }
})

describe('Главная страница', () => {
  beforeEach(() => {
    useGetSettings.mockImplementation(() => ({}))
    useSetSettings.mockImplementation(() => ({}))
    useBuilds.mockImplementation(() => ({}))
    useBuildDetails.mockImplementation(() => ({}))
    useBuildLog.mockImplementation(() => ({}))
  })

  it('Получаем данные настроек', () => {
    renderWithRouter(<App />, { route: '/' })
    expect(useGetSettings).toHaveBeenCalled()
  })

  describe('Статус загрузки', () => {
    it('Отображается прелоадер', () => {
      useGetSettings.mockImplementation(() => ({
        isLoading: true,
      }))

      renderWithRouter(<App />, { route: '/' })
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toBeInTheDocument()
    })
  })

  describe('Статус ошибки', () => {
    it('Отображается заглушка с ошибкой', () => {
      useGetSettings.mockImplementation(() => ({
        isError: true,
        error: { message: 'Something went wrong' },
      }))

      renderWithRouter(<App />, { route: '/' })
      const errorText = screen.getByText(/Something went wrong/i)
      expect(errorText).toBeInTheDocument()
    })
  })

  describe('Пришел пустой объект с настройками', () => {
    beforeEach(() => {
      useGetSettings.mockImplementation(() => ({
        data: {},
      }))
    })
    it('Отображается компонент заглушки', () => {
      renderWithRouter(<App />, { route: '/' })
      const text = screen.getByText(/Open Settings/i)
      expect(text).toBeInTheDocument()
    })
    it('Отображается дефолтное лого в хедере', () => {
      renderWithRouter(<App />, { route: '/' })
      const text = screen.getByText(/School CI server/i)
      expect(text).toBeInTheDocument()
    })
    it('Отображается кнопка настроек к хедере', () => {
      renderWithRouter(<App />, { route: '/' })
      const link = screen.getByTestId('settings-link')
      expect(link).toBeInTheDocument()
    })
  })

  describe('Пришел не пустой объект с настройками', () => {
    beforeEach(() => {
      useGetSettings.mockImplementation(() => ({
        data: settingsMock,
      }))
    })
    it('Не отображается компонент заглушки', () => {
      renderWithRouter(<App />, { route: '/' })
      const text = screen.queryByText(/Open Settings/i)
      expect(text).not.toBeInTheDocument()
    })

    it('Отображается кнопка запуска билда', () => {
      renderWithRouter(<App />, { route: '/' })
      const button = screen.getByTestId('run-button')
      expect(button).toBeInTheDocument()
    })

    it('Отображается кнопка настроек', () => {
      renderWithRouter(<App />, { route: '/' })
      const link = screen.getByTestId('settings-link')
      expect(link).toBeInTheDocument()
    })

    describe('Отображается компонент списка билдов', () => {
      beforeEach(() => {
        useGetSettings.mockImplementation(() => ({
          data: settingsMock,
        }))
      })
      it('Статус загрузки', () => {
        useBuilds.mockImplementation(() => ({
          isLoading: true,
        }))
        renderWithRouter(<App />, { route: '/' })
        const spinner = screen.getByTestId('spinner')
        expect(spinner).toBeInTheDocument()
      })

      it('Статус ошибки', () => {
        useBuilds.mockImplementation(() => ({
          isError: true,
          error: { message: 'Something went wrong' },
        }))
        renderWithRouter(<App />, { route: '/' })
        const errorText = screen.getByText(/Something went wrong/i)
        expect(errorText).toBeInTheDocument()
      })

      it('Отображается список билдов', () => {
        useBuilds.mockImplementation(() => ({
          data: buildsMock,
        }))
        renderWithRouter(<App />, { route: '/' })
        const buildItems = screen.getAllByTestId('build-card')
        expect(buildItems.length).toEqual(buildsMock.data.length)
      })
    })
  })

  describe('Роутинг со страницы', () => {
    it('Переход на страницу настроек при клике на кнопку настроек', () => {
      renderWithRouter(<App />, { route: '/' })
      const link = screen.getByTestId('settings-link')
      fireEvent.click(link)
      const heading = screen.getByTestId('settings-heading')
      expect(heading).toBeInTheDocument()
    })

    it('Переход на страницу деталей билда при клике на карточку билда', () => {
      useGetSettings.mockImplementation(() => ({
        data: settingsMock,
      }))
      useBuilds.mockImplementation(() => ({
        data: buildsMock,
      }))
      useBuildDetails.mockImplementation(() => ({
        data: buildCardMock,
      }))
      renderWithRouter(<App />, { route: '/' })
      const buildItems = screen.getAllByTestId('build-card')
      fireEvent.click(buildItems[0])
      const buttonRebuild = screen.getByTestId('rebuild-button')

      expect(buttonRebuild).toBeInTheDocument()
    })
  })

  it('Отображается футер', () => {
    renderWithRouter(<App />, { route: '/' })
    const footer = screen.getByTestId('footer')
    expect(footer).toBeInTheDocument()
  })

  it('Отображается модальное окно при клике на кнопку запуска билда', () => {
    useGetSettings.mockImplementation(() => ({
      data: settingsMock,
    }))
    useBuilds.mockImplementation(() => ({
      data: buildsMock,
    }))

    renderWithRouter(<App />, { route: '/' })
    const button = screen.getByTestId('run-button')
    fireEvent.click(button)
    const modal = screen.getByTestId('modal')
    expect(modal).toBeInTheDocument()
  })
})

describe('Страница настроек', () => {
  beforeEach(() => {
    useGetSettings.mockImplementation(() => ({}))
    useSetSettings.mockImplementation(() => ({}))
    useBuilds.mockImplementation(() => ({}))
    useBuildDetails.mockImplementation(() => ({}))
    useBuildLog.mockImplementation(() => ({}))
  })

  it('Получаем данные настроек', () => {
    renderWithRouter(<App />, { route: '/settings' })
    expect(useGetSettings).toHaveBeenCalled()
  })

  it('Отображается страница настроек', () => {
    useGetSettings.mockImplementation(() => ({
      data: settingsMock,
    }))
    renderWithRouter(<App />, { route: '/settings' })
    const logo = screen.getByTestId('home-link')
    expect(logo).toBeInTheDocument()
  })

  it('Отображается форма отправки настроек', () => {
    useGetSettings.mockImplementation(() => ({
      data: settingsMock,
    }))
    renderWithRouter(<App />, { route: '/settings' })
    const form = screen.getByTestId('settings-form')
    expect(form).toBeInTheDocument()
  })

  it('При клике на логотип происходит переход на главную страницу', () => {
    useGetSettings.mockImplementation(() => ({
      data: settingsMock,
    }))
    renderWithRouter(<App />, { route: '/settings' })
    const logo = screen.queryByTestId('home-link')
    fireEvent.click(logo)
    expect(logo).not.toBeInTheDocument()
  })
})

describe('Страница билда', () => {
  beforeEach(() => {
    useGetSettings.mockImplementation(() => ({}))
    useSetSettings.mockImplementation(() => ({}))
    useBuilds.mockImplementation(() => ({}))
    useBuildDetails.mockImplementation(() => ({}))
    useBuildLog.mockImplementation(() => ({}))
  })

  it('Получаем данные настроек', () => {
    renderWithRouter(<App />, { route: '/settings' })
    expect(useGetSettings).toHaveBeenCalled()
  })

  describe('Статус загрузки', () => {
    it('Отображается прелоадер', () => {
      useGetSettings.mockImplementation(() => ({
        data: settingsMock,
      }))

      useBuildDetails.mockImplementation(() => ({
        isLoading: true,
      }))

      useBuildLog.mockImplementation(() => ({
        isLoading: true,
      }))

      renderWithRouter(<App />, { route: `/build/${buildCardMock.id}` })
      const preloader = screen.getByTestId('spinner')
      expect(preloader).toBeInTheDocument()
    })
  })

  describe('Статус ошибки', () => {
    it('Отображается ошибка', () => {
      useGetSettings.mockImplementation(() => ({
        data: settingsMock,
      }))

      useBuildDetails.mockImplementation(() => ({
        isError: true,
        error: { message: 'Something went wrong' },
      }))

      useBuildLog.mockImplementation(() => ({
        isError: true,
        error: { message: 'Something went wrong' },
      }))

      renderWithRouter(<App />, { route: `/build/${buildCardMock.id}` })
      const errorText = screen.getByText(/Something went wrong/i)
      expect(errorText).toBeInTheDocument()
    })
  })

  describe('Получение данных', () => {
    it('Отображаются данные билда и лог', () => {
      useGetSettings.mockImplementation(() => ({
        data: settingsMock,
      }))

      useBuildDetails.mockImplementation(() => ({
        data: buildCardMock,
      }))

      useBuildLog.mockImplementation(() => ({
        data: buildLogMock,
      }))

      renderWithRouter(<App />, { route: `/build/${buildCardMock.id}` })
      const buildCard = screen.getByTestId('build-card')
      const buildLog = screen.getByTestId('build-log')
      expect(buildCard).toBeInTheDocument()
      expect(buildLog).toBeInTheDocument()
    })
  })

  describe('Роутинг со страницы', () => {
    beforeEach(() => {
      useGetSettings.mockImplementation(() => ({
        data: settingsMock,
      }))

      useBuildDetails.mockImplementation(() => ({
        data: buildCardMock,
      }))

      useBuildLog.mockImplementation(() => ({
        data: buildLogMock,
      }))

    })
    it('Переход на страницу настроек при клике на кнопку настроек', () => {
      renderWithRouter(<App />, { route: `/build/${buildCardMock.id}` })
      const link = screen.getByTestId('settings-link')
      fireEvent.click(link)
      const heading = screen.getByTestId('settings-heading')
      expect(heading).toBeInTheDocument()
    })

    it('При клике на логотип происходит переход на главную страницу', () => {
  
      renderWithRouter(<App />, { route: `/build/${buildCardMock.id}` })
      const logo = screen.queryByTestId('home-link')
      fireEvent.click(logo)
      expect(logo).not.toBeInTheDocument()
    })
  })
})
