class ZcPlugin {
  constructor(config) {
    this.productName = config.productName
    this.platform = config.platform
  }
  apply(compiler){
    compiler.hooks.done.tap('ZcPlugin', (stats) => {
      console.log('xxx', this.productName, this.platform);
    });
  }
}

module.exports = {
  ZcPlugin
}
