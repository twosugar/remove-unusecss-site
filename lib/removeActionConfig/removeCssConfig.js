const config = {
    //注意检测对象一定要是单页，检测过程中不能有刷新页面的操作，否则会丢失之前的检测结果
    url: 'https://www.baidu.com/',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    viewport: {
        width: 375, height: 812
    },
    actions: [
        /* type: 类型， selector：目标dom, time: 停留时间 */
        /*
        CLICK: 点击，（按钮点击）
        TYPE: 输入，（输入框输入）
        START: 开始捕获样式
        STOP: 停止捕获样式
        */
        { type: 'CLICK', selector: '.input-wrapper' },
        { type: 'TYPE', selector: '.new-search-input' },
        { type: 'CLICK', selector: '.se-bn' },
        { type: 'START' },
    ],
    browserConfig: {}
}