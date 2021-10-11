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