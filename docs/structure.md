# Структура проекта

```
HW_11-4_testing/
├── __mocks__/                                  │   Заглушки для тестов (Jest)
│   ├── fileMock.js                             │   Для изображений
│   └── styleMock.js                            │   Для CSS
├── .github/                                    │   CI/CD
│   └── workflows/
│       └── web.yml                             │   GitHub Actions workflow
├── .husky/                                     │   Git-хуки
│   └── pre-commit                              │   Запуск линтера перед коммитом
├── docs/                                       │   Документация проекта
│   ├── features.md                             │   Функциональность
│   ├── installation.md                         │   Установка и запуск
│   ├── screenshot.png                          │   Скриншот виджета
│   ├── structure.md                            │   Этот файл
│   ├── tech-stack.md                           │   Используемые технологии
│   └── testing.md                              │   Тестирование
├── e2e/                                        │   Сквозные тесты
│   └── puppeteer.test.js                       │   Тесты с Puppeteer
├── src/                                        │   Исходный код
│   ├── css/                                    │   Стили
│   │   ├── modal.css                           │   Стили модального окна
│   │   └── style.css                           │   Основные стили виджета
│   ├── img/                                    │   Логотипы карт
│   │   ├── amex.png
│   │   ├── diners.png
│   │   ├── discover.png
│   │   ├── jcb.png
│   │   ├── mastercard.png
│   │   ├── mir.png
│   │   └── visa.png
│   ├── js/                                     │   JavaScript-модули
│   │   ├── card/                               │   Логика платёжных карт
│   │   │   ├── __tests__/                      │   Тесты для модулей card
│   │   │   │   ├── CardManager.test.js
│   │   │   │   ├── cardTypeDetector.test.js
│   │   │   │   └── validator.test.js
│   │   │   ├── CardManager.js                  │   Управление логотипами
│   │   │   ├── cardData.js                     │   Конфигурация карт
│   │   │   ├── cardTypeDetector.js             │   Определение типа карты
│   │   │   └── validator.js                    │   Алгоритм Луна
│   │   ├── modal/                              │   Модальное окно
│   │   │   ├── __tests__/                      │   Тесты модалки
│   │   │   │   └── modal.test.js
│   │   │   └── modal.js                        │   Класс модального окна
│   │   └── widget/                             │   Основной виджет
│   │       ├── __tests__/                      │   DOM-тесты виджета
│   │       │   └── widget.test.js
│   │       └── app.js                          │   Класс виджета
│   ├── index.html                              │   Шаблон HTML
│   └── index.js                                │   Точка входа
├── .babelrc                                    │   Настройки Babel
├── .browserslistrc                             │   Целевые браузеры
├── .editorconfig                               │   Настройки редактора
├── .gitignore                                  │   Игнорируемые файлы
├── .prettierrc                                 │   Настройки Prettier
├── .releaserc.json                             │   Настройки semantic-release
├── eslint.config.mjs                           │   Настройки ESLint
├── jest.config.js                              │   Настройки Jest
├── package-lock.json                           │   Lock-файл npm
├── package.json                                │   Зависимости и скрипты
├── README.md                                   │   Главный файл документации
├── webpack.common.js                           │   Общая конфигурация Webpack
├── webpack.dev.js                              │   Конфигурация для разработки
└── webpack.prod.js                             │   Конфигурация для продакшна
```



## Ключевые модули

- **`card/`** — логика, связанная с платёжными картами (определение типа, валидация, управление логотипами).
- **`modal/`** — компонент модального окна.
- **`widget/`** — основной виджет, связывающий все части приложения.