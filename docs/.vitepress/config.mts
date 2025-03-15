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
      { text: 'Домой', link: '/' },
      { text: 'Документация', link: '/getting-start' }
    ],

    sidebar: [
      {
        text: 'Страницы',
        items: [
          { text: 'Документация', link: '/getting-start' },
          { text: 'Проекты', link: '/projects' }
        ]
      },
      
    ],
  }
})
