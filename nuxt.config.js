import join from 'memory-fs/lib/join'

const metaTitle = 'Planetside 2 Alert Tracker'
const metaDesc = "PS2Alerts - Building Planetside 2's Alert metagame"
const metaImg = `${process.env.BASE_URL}/social-share.png`

export default {
  // We're forced to use env injection for this otherwise we can't build it into class constructors.
  env: {
    apiHost: process.env.API_HOST ?? 'http://dev.api.ps2alerts.com',
  },
  publicRuntimeConfig: {
    environment: process.env.NODE_ENV ?? 'UNKNOWN ENVIRONMENT',
    build: process.env.BUILD ?? 'UNKNOWN BUILD',
    version: process.env.VERSION ?? 'UNKNOWN VERSION',
    baseUrl: process.env.BASE_URL ?? 'http://dev.ps2alerts.com',
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    timing: false,
  },
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'PS2Alerts',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'title', content: metaTitle },
      {
        hid: 'description',
        name: 'description',
        content: metaDesc,
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: metaDesc,
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: metaTitle,
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: metaImg,
      },
      {
        hid: 'og:type',
        name: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:url',
        name: 'og:url',
        content: process.env.BASE_URL,
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: metaTitle,
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: metaTitle,
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: metaImg,
      },
      {
        hid: 'twitter:image:alt',
        name: 'twitter:image:alt',
        content: metaTitle,
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '@/filters/AlertEndTime', mode: 'client' },
    { src: '@/filters/BracketName', mode: 'client' },
    { src: '@/filters/DateTimeFormat', mode: 'client' },
    { src: '@/filters/FactionName', mode: 'client' },
    { src: '@/filters/ItemShortName', mode: 'client' },
    { src: '@/filters/VehicleFaction', mode: 'client' },
    { src: '@/filters/WorldName', mode: 'client' },
    { src: '@/filters/ZoneName', mode: 'client' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://github.com/nuxt-community/google-gtag-module
    '@nuxtjs/google-gtag',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    [
      'nuxt-fontawesome',
      {
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas'],
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab'],
          },
        ],
      },
    ],
  ],
  tailwindcss: {
    configPath: 'tailwind.config.js',
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // https://www.npmjs.com/package/@nuxtjs/vuetify
  vuetify: {
    theme: { dark: true },
    treeShake: true, // required for scss vars to work
  },

  'google-gtag': {
    id: process.env.GOOGLE_PROPERTY,
    debug: process.env.NODE_ENV !== 'production', // enable to track in dev mode
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        tailwindcss: join(__dirname, 'tailwind.config.js'),
        'postcss-import': {},
        'postcss-nested': {},
        'postcss-extend': {},
        'postcss-normalize': {},
        autoprefixer: {},
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true,
        },
      },
    },
  },
}
