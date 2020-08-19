
export default {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/bizyaz-icon.svg' }
    ]
  },
  loading: { color: '#fff' },
  css: [
  ],
  plugins: [
    '~plugins/date-filter.js',
    '~plugins/vue-fragment.js',
    '~plugins/global.js',
  ],
  buildModules: [
  ],
  modules: [
    '@nuxtjs/axios',
  ],
  serverMiddleware: [{path: '/api', handler: '~/api/index'}],
  axios: {},
  build: {
    extend (config, ctx) {
    }
  }
}
