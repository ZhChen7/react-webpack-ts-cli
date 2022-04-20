/**
 * 此文件作为 Generator 的核心入口
 * 需要导出一个继承自 Yeoman Generator 的类型
 * Yeoman Generator 在工作时会自动调用我们在此类型中定义的一些生命周期方法
 * 我们在这些方法中可以通过调用父类提供的一些工具方法实现一些功能，例如文件写入
 */

const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  writing() {
    // 把每一个文件都通过模板转换到目标路径

    const templates = [
      '.npmignore',
      'README.md',
      'template/index.html',
      'src/styles/palette.css',
      'src/utils/constant.ts',
      'src/utils/index.ts',
      'src/App.scss',
      'src/App.tsx',
      'src/index.tsx',
      'tsconfig.json',
      'package-lock.json',
      'package.json',
      'build/webpack.base.conf.js',
      'build/webpack.dev.conf.js',
      'config/index.js',
      'lib/src/App.d.ts',
      'lib/src/index.d.ts'
    ]

    templates.forEach(item => {
      // item => 每个文件路径
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        this.answers
      )
    })
  }
}
