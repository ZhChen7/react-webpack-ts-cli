const {
  NODE_ENV,
  compile_mode,
  TAG_ENVIRONMENT,
  ANALYZER,
  npm_package_version,
} = process.env

const tagEnv = TAG_ENVIRONMENT || 'test'

module.exports = {
  dev: {
    host: '127.0.0.1',
    port: '8080',
  },
  prod: {
    host: `//cnbj1.fds.api.xiaomi.com/store-mi-web/${tagEnv}/`,
  },
  build: {
    environment: tagEnv,
    assetsRoot: `assets`,
    distPath: `./opx/${tagEnv}`,
    packageVersion: npm_package_version,
    isAnalyzer: ANALYZER === 'true',
    isDevelopment: NODE_ENV === 'development',
  }
}
