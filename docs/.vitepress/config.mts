import { defineConfig } from 'vitepress'
import { navEn, navZh } from './nav.mts'
import { sidebarEn, sidebarZh } from './sidebar.mts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Github Copilot Note",
  description: "Learn how to use Github Copilot more efficiently",
  lastUpdated: true,
  base: '/github-copilot-note/',

locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: navEn,
        sidebar: sidebarEn
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-Hans',
      link: '/zh/',
      themeConfig: {
        nav: navZh,
        sidebar: sidebarZh
      }
    }
  },


  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zheng-yi-yi/github-copilot-note' }
    ],

    editLink: {
      pattern: 'https://github.com/zheng-yi-yi/github-copilot-note/edit/main/docs/:path'
    },

    footer: {
      message: 'Released under the GPLv3 License.',
      copyright: 'Copyright © 2026-present Zheng, YiYi'
    }
  }
})
