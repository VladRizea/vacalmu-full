import path from 'path'

export default {
  ssr: true,
  target: 'server',
  // Global page headers (https://go.nuxtjs.dev/config-head)

  watchQuery: true,

  head: {
    htmlAttrs: {
      lang: 'ro'
    },
    title: 'VACALMU',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Cele mai relatable articole originale pentru tineri si nu numai' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { hid: 'stripe', src: 'https://www.googletagmanager.com/gtag/js?id=G-YP3GYY957K' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/fonts/karla.css',
    '~/assets/css/styles.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {
        src: './plugins/GoogleAnalytics.js',
        mode: 'client'
    }
],
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    '@nuxtjs/proxy',
    '@nuxtjs/google-adsense',
  ],
 
  'google-adsense': {
    id: 'ca-pub-3630292987556158'
  },

  
  axios: {
    baseURL: 'http://localhost:5000',
    browserBaseURL : 'http://localhost:5000',
  },
  
  proxy: {
    '/api/v1': { target: 'http://localhost:5000/api/v1', pathRewrite: {'^/api/v1': ''} }
  },


  // axios: {
  //   baseURL: 'http://vacalmu-server:5000',
  //   browserBaseURL : 'http://vacalmu-server:5000',
  // },
  
  // proxy: {
  //   '/api/v1': { target: 'http://vacalmu-server:5000/api/v1', pathRewrite: {'^/api/v1': ''} }
  // },

  outputDir: path.resolve(__dirname, '../server/public'),
  
  bootstrapVue: {
    icons: true,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
