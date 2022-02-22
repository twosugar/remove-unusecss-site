### Remove-UnUseCSS
remove unusecss.利用puppeteer的能力，移除未被使用的css。在前端性能优化中，你可能会发现某个页面引入了较多或者较大的css文件，而真正用于当前页面的css只占据了一小部分，而缩减css体积正是前端性能优化的方向之一,目前有一些网站可以针对页面进行css提取，但对于动态变化的页面，其准确率就相当低了。

利用chrome coverage统计 + puppeteer自动化的方式提取更为准确的"关键css"

### 服务器部署踩坑（CentOS）
## 依赖
 ![image](http://www.sugarfish.top:3002/img/Error.png)
 运行puppeteer 遇到这种问题需要依次安装依赖 https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md
 ```
 yum install libxshmfence -y
 ```
总之缺啥安装啥

## 运行报错 puppeteer Running as root without --no-sandbox is not supported
需要设置
```
const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
});
```
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
