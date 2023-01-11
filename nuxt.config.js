export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - RutaJob',
    title: 'The Smart Way to Connect Companies and Employees',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/sass/style.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-feather-nuxt.js', ssr: false},
    { src: '~/plugins/vue-bar-nuxt.js', ssr: false},
    { src: '~/plugins/vue-apex-charts-nuxt.js', ssr: false},
    { src: '~/plugins/v-mask.js', ssr: false},
    { src: '~/plugins/api.js'},
    { src: '~/plugins/mixnis.js'},
    { src: '~/plugins/lodash.js'},
    { src: '~/plugins/directives.js'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    // '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/i18n',
    '@nuxtjs/date-fns'
  ],

  router: {
    middleware: ['auth']
  },

  auth: {
    strategies: {
      'laravelJWT': {
        provider: 'laravel/jwt',
        url: process.env.API_BASE_URL,
        // endpoints: {
        //   ...
        // },
        token: {
          property: 'access_token',
          maxAge: 20160 * 60
        },
        refreshToken: {
          maxAge: 20160 * 60
        },
      },
    },
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/',
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_BASE_URL + '/api/v1',
    credentials: false
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.js'
      },
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'en'
  },
  env: {
    MEDIA_BASE_URL: process.env.MEDIA_BASE_URL || 'http://localhost:3000'
  }
}
