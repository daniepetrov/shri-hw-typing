# Домашнее задание по теме "Тестирование"
Ваше приложение — это CI сервер, который работает с Git репозиторием. Параметры репозитория задаются в настройках.
Для любого из коммитов репозитория можно запустить операцию сборки. Сборка — это выполнение каких-то действий над содержимым репозитория. Результатом сборки является лог её выполнения.
CI сервер должен отображать список сборок с информацией о них. Также он должен давать возможность посмотреть лог любой сборки. Кроме того, он должен иметь возможность редактирования настроек репозитория.

## Установить зависимости

```
npm install
```

## Собрать проект

```
npm run build
```

Если в сборке есть неиспользуемый (dead) код, то во время сборки в корне проекта будет сгенерирован файл ```unused.json```

## Запустить тесты 

```
npm run test
```

### Выбор и обоснование тестов
Используя ```jest``` и ```testing library``` мы можем с помощью модульных тестов отностельно незатратно протестировать наш интерфейс.

Тестируем интерфейс, а не делати реализации. Текущее приложение состоит из 3 страниц:
1. Главная страница
```
  ✓ Получаем данные настроек
  ✓ Отображается футер
  ✓ Отображается модальное окно при клике на кнопку запуска билда
  Статус загрузки
    ✓ Отображается прелоадер
  Статус ошибки
    ✓ Отображается заглушка с ошибкой
  Пришел пустой объект с настройками
    ✓ Отображается компонент заглушки
    ✓ Отображается дефолтное лого в хедере
    ✓ Отображается кнопка настроек к хедере
  Пришел не пустой объект с настройками
    ✓ Не отображается компонент заглушки
    ✓ Отображается кнопка запуска билда
    ✓ Отображается кнопка настроек
    Отображается компонент списка билдов
      ✓ Статус загрузки
      ✓ Статус ошибки
      ✓ Отображается список билдов
  Роутинг со страницы
    ✓ Переход на страницу настроек при клике на кнопку настроек
    ✓ Переход на страницу деталей билда при клике на карточку билда
```

2. Страница настроек
```
  ✓ Получаем данные настроек
  ✓ Отображается страница настроек
  ✓ Отображается форма отправки настроек
  ✓ При клике на логотип происходит переход на главную страницу
```
3. Страница билда
```
  ✓ Получаем данные настроек
  Статус загрузки
    ✓ Отображается прелоадер
  Статус ошибки
    ✓ Отображается ошибка
  Получение данных
    ✓ Отображаются данные билда и лог
  Роутинг со страницы
    ✓ Переход на страницу настроек при клике на кнопку настроек
    ✓ При клике на логотип происходит переход на главную страницу
```





## Запустить сервер

```
npm run start
```

Для работы с переменными окружения используется пакет **dotenv**, необходимо создать .env файл в корне проекта:

```
AUTH_TOKEN=<token>
```
