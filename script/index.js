const puppeteer = require('puppeteer-core');
const browserFetcher = puppeteer.createBrowserFetcher();
const ProgressBar = require('progress');

function progressCallback(downloadedBytes, totalBytes) {
    const bar = new ProgressBar('加载chromium中 [:bar] :percent', { curr: downloadedBytes, total: totalBytes, width: 20 });
    bar.tick()
    if (bar.complete) {
        console.log('\ncomplete\n');
    }
}

const loadChromium = async () => {
    const result = await browserFetcher.download("901912", progressCallback)
        .then(res => {
            console.log('\x1B[32m--------- 加载chromium成功 ---------- from: remove-unusecss \x1B[0m')
            console.log(`\x1B[32m--------- chromium解压路径 ${res.executablePath} ---------- \x1B[0m`)
            return res
        })
        .catch(err => {
            console.log('\x1B[32m--------- 加载chromium成功 ---------- from: remove-unusecss \x1B[0m')
            console.log('\x1B[31m--------- 加载chromium失败 ---------- from: remove-unusecss \x1B[0m')
        })
}

loadChromium()