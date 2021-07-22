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

const mockedUseGetSettings = useGetSettings as jest.Mock<any>
const mockedUseSetSettings = useSetSettings as jest.Mock<any>
const mockedUseBuilds = useBuilds as jest.Mock<any>
const mockedUseBuildDetails= useBuildDetails as jest.Mock<any>
const mockedUseBuildLog = useBuildLog as jest.Mock<any>

describe('Главная страница', () => {
  beforeEach(() => {
    mockedUseGetSettings.mockImplementation(() => ({}))
    mockedUseSetSettings.mockImplementation(() => ({}))
    mockedUseBuilds.mockImplementation(() => ({}))
    mockedUseBuildDetails.mockImplementation(() => ({}))
    mockedUseBuildLog.mockImplementation(() => ({}))
  })

  it('Получаем данные настроек', () => {
    global.renderWithRouter(<App />, { route: '/' })
    expect(mockedUseGetSettings).toHaveBeenCalled()
  })

  describe('Статус загрузки', () => {
    it('Отображается прелоадер', () => {
      mockedUseGetSettings.mockImplementation(() => ({
        isLoading: true,
      }))

      global.renderWithRouter(<App />, { route: '/' })
      const spinner = screen.getByTestId('spinner')
      expect(spinner).toBeInTheDocument()
    })
  })

  describe('Статус ошибки', () => {
    it('Отображается заглушка с ошибкой', () => {
      mockedUseGetSettings.mockImplementation(() => ({
        isError: true,
        error: { message: 'Something went wrong' },
      }))

      global.renderWithRouter(<App />, { route: '/' })
      const errorText = screen.getByText(/Something went wrong/i)
      expect(errorText).toBeInTheDocument()
    })
  })

  describe('Пришел пустой объект с настройками', () => {
    beforeEach(() => {
      mockedUseGetSettings.mockImplementation(() => ({
        data: {},
      }))
    })
    it('Отображается компонент заглушки', () => {
      global.renderWithRouter(<App />, { route: '/' })
      const text = screen.getByText(/Open Settings/i)
      expect(text).toBeInTheDocument()
    })
    it('Отображается дефолтное лого в хедере', () => {
      global.renderWithRouter(<App />, { route: '/' })
      const text = screen.getByText(/School CI server/i)
      expect(text).toBeInTheDocument()
    })
    it('Отображается кнопка настроек к хедере', () => {
      global.renderWithRouter(<App />, { route: '/' })
      const link = screen.getByTestId('settings-link')
      expect(link).toBeInTheDocument()
    })
  })

  describe('Пришел не пустой объект с настройками', () => {
    beforeEach(() => {
      mockedUseGetSettings.mockImplementation(() => ({
        data: settingsMock,
      }))
    })
    it('Не отображается компонент заглушки', () => {
      global.renderWithRouter(<App />, { route: '/' })
      const text = screen.queryByText(/Open Settings/i)
      expect(text).not.toBeInTheDocument()
    })

    it('Отображается кнопка запуска билда', () => {
      global.renderWithRouter(<App />, { route: '/' })
      const button = screen.getByTestId('run-button')
      expect(button).toBeInTheDocument()
    })

    it('Отображается кнопка настроек', () => {
      global.renderWithRouter(<App />, { route: '/' })
      const link = screen.getByTestId('settings-link')
      expect(link).toBeInTheDocument()
    })

    describe('Отображается компонент списка билдов', () => {
      beforeEach(() => {
        mockedUseGetSettings.mockImplementation(() => ({
          data: settingsMock,
        }))
      })
      it('Статус загрузки', () => {
        mockedUseBuilds.mockImplementation(() => ({
          isLoading: true,
        }))
        global.renderWithRouter(<App />, { route: '/' })
        const spinner = screen.getByTestId('spinner')
        expect(spinner).toBeInTheDocument()
      })

      it('Статус ошибки', () => {
        mockedUseBuilds.mockImplementation(() => ({
          isError: true,
          error: { message: 'Something went wrong' },
        }))
        global.renderWithRouter(<App />, { route: '/' })
        const errorText = screen.getByText(/Something went wrong/i)
        expect(errorText).toBeInTheDocument()
      })

      it('Отображается список билдов', () => {
        mockedUseBuilds.mockImplementation(() => ({
          data: buildsMock,
        }))
        global.renderWithRouter(<App />, { route: '/' })
        const buildItems = screen.getAllByTestId('build-card')
        expect(buildItems.length).toEqual(buildsMock.data.length)
      })
    })
  })

  describe('Роутинг со страницы', () => {
    it('Переход на страницу настроек при клике на кнопку настроек', () => {
      global.renderWithRouter(<App />, { route: '/' })
      const link = screen.getByTestId('settings-link')
      fireEvent.click(link)
      const heading = screen.getByTestId('settings-heading')
      expect(heading).toBeInTheDocument()
    })

    it('Переход на страницу деталей билда при клике на карточку билда', () => {
      mockedUseGetSettings.mockImplementation(() => ({
        data: settingsMock,
      }))
      mockedUseBuilds.mockImplementation(() => ({
        data: buildsMock,
      }))
      mockedUseBuildDetails.mockImplementation(() => ({
        data: buildCardMock,
      }))
      global.renderWithRouter(<App />, { route: '/' })
      const buildItems = screen.getAllByTestId('build-card')
      fireEvent.click(buildItems[0])
      const buttonRebuild = screen.getByTestId('rebuild-button')

      expect(buttonRebuild).toBeInTheDocument()
    })
  })

  it('Отображается футер', () => {
    global.renderWithRouter(<App />, { route: '/' })
    const footer = screen.getByTestId('footer')
    expect(footer).toBeInTheDocument()
  })

  it('Отображается модальное окно при клике на кнопку запуска билда', () => {
    mockedUseGetSettings.mockImplementation(() => ({
      data: settingsMock,
    }))
    mockedUseBuilds.mockImplementation(() => ({
      data: buildsMock,
    }))

    global.renderWithRouter(<App />, { route: '/' })
    const button = screen.getByTestId('run-button')
    fireEvent.click(button)
    const modal = screen.getByTestId('modal')
    expect(modal).toBeInTheDocument()
  })
})

describe('Страница настроек', () => {
  beforeEach(() => {
    mockedUseGetSettings.mockImplementation(() => ({}))
    mockedUseSetSettings.mockImplementation(() => ({}))
    mockedUseBuilds.mockImplementation(() => ({}))
    mockedUseBuildDetails.mockImplementation(() => ({}))
    mockedUseBuildLog.mockImplementation(() => ({}))
  })

  it('Получаем данные настроек', () => {
    global.renderWithRouter(<App />, { route: '/settings' })
    expect(mockedUseGetSettings).toHaveBeenCalled()
  })

  it('Отображается страница настроек', () => {
    mockedUseGetSettings.mockImplementation(() => ({
      data: settingsMock,
    }))
    global.renderWithRouter(<App />, { route: '/settings' })
    const logo = screen.getByTestId('home-link')
    expect(logo).toBeInTheDocument()
  })

  it('Отображается форма отправки настроек', () => {
    mockedUseGetSettings.mockImplementation(() => ({
      data: settingsMock,
    }))
    global.renderWithRouter(<App />, { route: '/settings' })
    const form = screen.getByTestId('settings-form')
    expect(form).toBeInTheDocument()
  })

  it('При клике на логотип происходит переход на главную страницу', () => {
    mockedUseGetSettings.mockImplementation(() => ({
      data: settingsMock,
    }))
    global.renderWithRouter(<App />, { route: '/settings' })
    const logo = screen.queryByTestId('home-link')
    fireEvent.click(logo)
    expect(logo).not.toBeInTheDocument()
  })
})

describe('Страница билда', () => {
  beforeEach(() => {
    mockedUseGetSettings.mockImplementation(() => ({}))
    mockedUseSetSettings.mockImplementation(() => ({}))
    mockedUseBuilds.mockImplementation(() => ({}))
    mockedUseBuildDetails.mockImplementation(() => ({}))
    mockedUseBuildLog.mockImplementation(() => ({}))
  })

  it('Получаем данные настроек', () => {
    global.renderWithRouter(<App />, { route: '/settings' })
    expect(mockedUseGetSettings).toHaveBeenCalled()
  })

  describe('Статус загрузки', () => {
    it('Отображается прелоадер', () => {
      mockedUseGetSettings.mockImplementation(() => ({
        data: settingsMock,
      }))

      mockedUseBuildDetails.mockImplementation(() => ({
        isLoading: true,
      }))

      mockedUseBuildLog.mockImplementation(() => ({
        isLoading: true,
      }))

      global.renderWithRouter(<App />, { route: `/build/${buildCardMock.id}` })
      const preloader = screen.getByTestId('spinner')
      expect(preloader).toBeInTheDocument()
    })
  })

  describe('Статус ошибки', () => {
    it('Отображается ошибка', () => {
      mockedUseGetSettings.mockImplementation(() => ({
        data: settingsMock,
      }))

      mockedUseBuildDetails.mockImplementation(() => ({
        isError: true,
        error: { message: 'Something went wrong' },
      }))

      mockedUseBuildLog.mockImplementation(() => ({
        isError: true,
        error: { message: 'Something went wrong' },
      }))

      global.renderWithRouter(<App />, { route: `/build/${buildCardMock.id}` })
      const errorText = screen.getByText(/Something went wrong/i)
      expect(errorText).toBeInTheDocument()
    })
  })

  describe('Получение данных', () => {
    it('Отображаются данные билда и лог', () => {
      mockedUseGetSettings.mockImplementation(() => ({
        data: settingsMock,
      }))

      mockedUseBuildDetails.mockImplementation(() => ({
        data: buildCardMock,
      }))

      mockedUseBuildLog.mockImplementation(() => ({
        data: buildLogMock,
      }))

      global.renderWithRouter(<App />, { route: `/build/${buildCardMock.id}` })
      const buildCard = screen.getByTestId('build-card')
      const buildLog = screen.getByTestId('build-log')
      expect(buildCard).toBeInTheDocument()
      expect(buildLog).toBeInTheDocument()
    })
  })

  describe('Роутинг со страницы', () => {
    beforeEach(() => {
      mockedUseGetSettings.mockImplementation(() => ({
        data: settingsMock,
      }))

      mockedUseBuildDetails.mockImplementation(() => ({
        data: buildCardMock,
      }))

      mockedUseBuildLog.mockImplementation(() => ({
        data: buildLogMock,
      }))
    })
    it('Переход на страницу настроек при клике на кнопку настроек', () => {
      global.renderWithRouter(<App />, { route: `/build/${buildCardMock.id}` })
      const link = screen.getByTestId('settings-link')
      fireEvent.click(link)
      const heading = screen.getByTestId('settings-heading')
      expect(heading).toBeInTheDocument()
    })

    it('При клике на логотип происходит переход на главную страницу', () => {
      global.renderWithRouter(<App />, { route: `/build/${buildCardMock.id}` })
      const logo = screen.queryByTestId('home-link')
      fireEvent.click(logo)
      expect(logo).not.toBeInTheDocument()
    })
  })
})
