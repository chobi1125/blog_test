const config = require('./.contentful.json')
const contentful = require('contentful')
const client = contentful.createClient({
  space: config.CTF_SPACE_ID,
  accessToken: config.CTF_CDA_ACCESS_TOKEN
}) 

import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
 env: {
  CTF_SPACE_ID: config.CTF_SPACE_ID,
  CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN
},

  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
//  font-awesomeはmodulesに追加した上でここにも設定
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
 // プラグインの導入
  plugins: [
    { src: '~plugins/font-awesome', ssr: false },
    { src: '~plugins/vuesax.js' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
//  モジュールの追加
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/markdownit',
    'nuxt-fontawesome',
    '@nuxtjs/axios',
  ],
// markdownitを使用する際の初期設定
  markdownit: { 
    injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
    breaks: true, // 改行コードを<br>に変換する
    html: true, // HTML タグを有効にする
    linkify: true, // URLに似たテキストをリンクに自動変換する
    typography: true,  // 言語に依存しないきれいな 置換 + 引用符 を有効にします。
  },
// FontAwesomeのコンポーネントをfaという名前で呼び出せるように
  fontawesome: {
    component: 'fa'
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          twitter: '#55acee',
          facebook: '#3b5998',
          background: colors.grey.lighten5
        }
      }
    }
  },
  generate: {
    routes () {
      return Promise.all([
        client.getEntries({
          'content_type': 'work'
        }),
        client.getEntries({
          'content_type': 'category'
        }),
        client.getEntries({
          'content_type': 'tag'
        })
      ]).then(([works,categories,tags]) => {
        return [
          ...works.items.map(work => `work/${work.fields.slug}`),
          ...categories.items.map(category => `category/${category.fields.slug}`),
          ...tags.items.map(tag => `tag/${tag.sys.id}`)
        ]
      })
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
