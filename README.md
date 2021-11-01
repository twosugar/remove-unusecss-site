### Remove-UnUseCSS
用于区分出当前页面已被使用和未被使用的css，可用于项目css体积优化

借助插件[remove-unusecss](https://github.com/twosugar/remove-unusecss)

项目第一次调用remove-unusecss时，会自动下载chromium，会等待几分钟

下载chromium成功后，运行项目，若仍提示需要下载chromium， 说明chromium解压出现了问题，

需要自己在本地重修下载, 下载成功得到解压目录之后，将目录地址配置到config传给`remove-unusecss`
`
const config = 
    ......
    browserConfig: {
        executablePath: '/Users/ytang/Documents/dev/remove-unusecss-site/node_modules/remove-unusecss/.local-chromium/mac-901912/chrome-mac/Chromium.app/Contents/MacOS/Chromium'
    }
}
`
### 项目搭建
This is a starter template for [Learn Next.js](https://nextjs.org/learn).
### nextjs 搭配 antd

最新版的antd@4.16.13版本引入nextjs会有uselayouteffect的警告信息，将antd版本降至4.15.6，警告消失

引入antd后做个按需加载的配置，保障首屏速度

需要借助两个包
`
npm i next-plugin-antd-less babel-plugin-import --save-dev
`

新建立 .babelrc.js
`
//.babelrc.js
module.exports = {
    presets: [['next/babel']],
    plugins: [['import', { libraryName: 'antd', style: true }]],
};
`

新建 next.config.js
`
// next.config.js
const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
    cssLoaderOptions: {},

    // Other Config Here...

    webpack(config) {
        return config;
    },

    // ONLY for Next.js 10, if you use Next.js 11, delete this block
    //   future: {
    //     webpack5: true,
    //   },
});
`

使用
`
import { Menu } from 'antd';
`