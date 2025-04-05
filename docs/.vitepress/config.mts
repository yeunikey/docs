import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "yeunikey.dev",
  description: "База знаний для yeunikey.dev",
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    // Логотип рядом с заголовком
    logo: '/favicon.ico', // Путь к логотипу в .vitepress/public

    nav: [
      { text: 'Документация', link: '/welcome' }
    ],

    sidebar: [
      {
        text: 'Начало',
        items: [
          { text: 'Приветствие', link: '/welcome' },
        ]
      },

      {
        text: 'AITU Superapp',
        items: [
          { text: 'Информация', link: '/superapp' },
          { text: 'Интеграция', link: '/superapp/integration' },
        ]
      },

    ],
  }
})
