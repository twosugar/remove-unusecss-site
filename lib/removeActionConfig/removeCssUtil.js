export const asyncTime = (time) => {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    })
}

export const getAction = async ({ page, type, selector, time, value }) => {
    switch (type) {
        case 'CLICK':
            await page.waitForSelector(selector, { timeout: 10000 })
            await page.click(selector)
            break;

        case 'TYPE':
            const ele = await page.waitForSelector(selector, { timeout: 10000 })
            await ele.type(value || 'hello')
            break;

        case 'START':
            //开始记录coverage
            await page.coverage.startCSSCoverage()

        case 'WAIT':
            await asyncTime(time)
            break;

        default:
            break;
    }
}