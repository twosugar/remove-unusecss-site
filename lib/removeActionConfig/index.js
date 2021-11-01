import defaultConfig from './removeCssConfig'
import { getAction } from './removeCssUtil'
import { loadChromium } from '../../script/index'
const puppeteer = require('puppeteer');
class RemoveUnusecss {
    constructor() {
        this.config = {
            ...defaultConfig
        }
    }

    async init() {
        //弃用
        const res = await loadChromium()
        if (!res) {
            throw new Error('初始化chromium失败')
        }
        this.config.browserConfig.executablePath = res.executablePath
    }

    async start(config) {
        this.config = {
            ...this.config,
            ...config
        }
        // if (!this.config.browserConfig.executablePath) { //没有自定义路径，则下载
        //     await this.init()
        // }
        //自定义配置chromium位置
        const browser = await puppeteer.launch({
            // executablePath: '/Users/ytang/Documents/dev/remove-unusecss/.local-chromium/mac-901912/chrome-mac/Chromium.app/Contents/MacOS/Chromium',
            slowMo: 100,    //放慢速度
            headless: false,
            defaultViewport: { width: 1440, height: 780 },
            ignoreHTTPSErrors: false, //忽略 https 报错
            ignoreDefaultArgs: ['--disable-setuid-sandbox', '--no-sandbox'],
            args: ['--start-fullscreen'], //全屏打开页面
            ...(this.config.browserConfig || {})
        });
        const pages = await browser.pages()
        let page = pages.length ? pages[0] : await browser.newPage()
        //设置模式，手机或者pc
        await page.setUserAgent(this.config.userAgent);
        //设置宽高
        await page.setViewport(this.config.viewport)
        //跳转页面
        await page.goto(this.config.url);
        //执行配置文件，便于coverage记录一些特色情况下才出现的样式
        for (const item of this.config.actions) {
            try {
                await getAction({ ...item, page })
            } catch (error) {
                console.error(error)
                browser.close()
                return {}
            }
        }

        //结束记录coverage
        const cssCoverage = await page.coverage.stopCSSCoverage()

        //已被使用的css
        let useCss = ''
        //未被使用的css
        let unuseCss = ''
        //遍历coverage内容
        for (const entry of cssCoverage) {
            let startIndex = 0
            for (const item of entry.ranges) {
                const unuseText = entry.text && entry.text.slice(startIndex, item.start) || ''
                const useText = entry.text && entry.text.slice(item.start, item.end) || ''
                startIndex = item.end
                useCss += useText
                unuseCss += unuseText
            }
            unuseCss += entry.text.slice(startIndex, entry.text.length)
        }
        browser.close()  //关闭浏览器
        return {
            useCss,
            unuseCss
        }

    }
}
const mold = new RemoveUnusecss()

export default mold