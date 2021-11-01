import Styles from './search-input.module.css'
import { Input, message, Form, Popover, Button, Radio, Select } from 'antd'
import { PlusOutlined, MinusCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react';
import { post } from '../../lib/request'

const actionList = [
    { title: '点击元素', type: 'CLICK', selector: '' },
    { title: '输入框输入', type: 'TYPE', selector: '', value: '' },
    { title: '开始记录css', type: 'START' }
]

const initActions = [
    { type: 'TYPE', selector: '.s_ipt', value: 'react' },
    { type: 'CLICK', selector: '.bg .s_btn' },
    { type: 'CLICK', selector: ".s_tab a[class='s-tab-item s-tab-pic']" },
    { type: 'START' },
    { type: 'CLICK', selector: '.filter-menu-item' },
    { type: 'CLICK', selector: ".filter-item-con li[val='3']" }
]

let info = {}

export default function SearchInput() {
    const [initStatus, setInitStatus] = useState(true)
    const [loading, setLoading] = useState(false)
    const [actionInfo, setActionInfo] = useState({ info })
    const [unUseCss, setUnuseCss] = useState('')
    const [useCss, setUseCss] = useState('')

    const startRemoveCss = (config) => {
        setLoading(true)
        setUseCss('')
        setUnuseCss('')
        post('/api/getUnuseCss', { config })
            .then(res => {
                // setName(res.text)
                setLoading(false)
                const { unuseCss, useCss } = res.data ?? {}
                setUnuseCss(unuseCss)
                setUseCss(useCss)
                setInitStatus(false)
            })
            .catch(err => {
                message.error('自动化失败，请稍后再试')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        for (let i = 0; i < initActions.length; i++) {
            const element = initActions[i];
            actionChange({ fieldKey: i }, element.type)
        }
    }, [])

    /**
     * @description: 选择操作
     */
    const actionChange = (item, value) => {
        let allowSelector = false
        let allowValue = false
        switch (value) {
            case 'TYPE':
                allowSelector = true //出现dom选择器输入框
                allowValue = true  //出现value输入框
                break;
            case 'CLICK':
                allowSelector = true  //出现dom选择器输入框
            default:
                break;
        }

        const data = {
            [item.fieldKey]: { type: value, allowSelector, allowValue }
        }
        info = { ...info, ...data }
        setActionInfo(info)
    }

    /**
     * @description: 移除步骤
     */
    const removeAction = (item) => {
        delete info[item.fieldKey]
        setActionInfo(info)
    }

    /**
     * @description: 气泡提示内容
     */
    const tipContent = () => {
        return <div style={{ width: 300 }}>
            步骤在进入页面之后依次执行,模拟人为操作。
            <br />
            选择器是通过document.querySelector筛选出dom元素。
            <br />
            例子：1.选择输入框输入；2.选择器填写 .page-content .xxxx a; 3.输入值填写xxxx。
        </div>
    }

    /**
     * @description: 提交
     */
    const onFinish = (values = {}) => {
        let params = {}
        if (values.browseMode === 'mobile') {
            params = {
                userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
                viewport: {
                    width: 375, height: 812
                },
            }
        } else {
            params = {
                userAgent: '5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
                viewport: {
                    width: 1028, height: 1800
                },
            }
        }
        const config = {
            url: values.destination,
            ...params,
            actions: values.actions || []
        }
        console.log(config)
        startRemoveCss(config)
    }

    const [form] = Form.useForm();


    return <div className={Styles.container}>
        <h1 className={Styles.title}>RemoveUnusecss</h1>
        {
            !initStatus && <div className={Styles.cssContainer}>
                <div className={Styles.cssItemBox}>
                    <h2>已被使用的css:</h2>
                    <Input.TextArea rows={15} showCount value={useCss} />
                </div>
                <div className={Styles.cssItemBox}>
                    <h2>未被使用的css:</h2>
                    <Input.TextArea rows={15} showCount value={unUseCss} />
                </div>
            </div>
        }
        {/* <Search className={Styles.search} size="large" enterButton="点我" placeholder="愤怒的小鸟" loading={loading} onSearch={onSearch}/> */}
        <Form
            name="basic"
            initialValues={{ remember: true }}
            style={{ width: 700 }}
            onFinish={onFinish}
            //   onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
        >
            <Form.Item
                initialValue="https://www.baidu.com/"
                labelCol={{ style: { width: 210 } }}
                label="目的地网页 Destination page"
                name="destination"
                rules={[{ required: true, message: 'Please enter the website address to be detected！' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                initialValue="pc"
                labelCol={{ style: { width: 210 } }}
                label="浏览模式 Browse mode"
                name="browseMode"
                rules={[{ required: true, message: 'Browse mode (mobile or pc)！' }]}
            >
                <Radio.Group>
                    <Radio value='mobile'>mobile</Radio>
                    <Radio value='pc'>PC</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.List
                name="actions"
                initialValue={initActions}
            >
                {
                    (fields, { add, remove }, { errors }) => (
                        <>
                            {
                                fields.map((field, index) => {
                                    return <Form.Item
                                        className={Styles.actionFormItem}
                                        key={index}
                                        label={<>步骤{index + 1} <Popover content={tipContent()}><QuestionCircleOutlined style={{ fontSize: 16, marginLeft: 5, color: '#e38c1d' }} /></Popover></>}
                                        labelCol={{ style: { width: 210, height: 32 } }}
                                    >

                                        <Form.Item
                                            shouldUpdate={(prevValues, curValues) =>
                                                prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                            }
                                        >
                                            <Input.Group compact>
                                                <Form.Item
                                                    // {...field}
                                                    // label="Sight"
                                                    name={[field.name, 'type']}
                                                    fieldKey={[field.fieldKey, 'type']}
                                                    rules={[{ required: true, message: 'Missing Type' }]}
                                                >
                                                    <Select allowClear style={{ width: 130 }} placeholder="选择操作类型" onChange={(e) => actionChange(field, e)}>
                                                        {actionList.map(item => (
                                                            <Select.Option key={item.type} value={item.type}>
                                                                {item.title}
                                                            </Select.Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                                {
                                                    !!actionInfo[field.fieldKey]?.allowSelector && <Form.Item
                                                        // {...field}
                                                        // label="Price"
                                                        style={{ width: 130 }}
                                                        name={[field.name, 'selector']}
                                                        fieldKey={[field.fieldKey, 'selector']}
                                                        rules={[{ required: true, message: 'Missing Selector' }]}
                                                    >
                                                        <Input allowClear placeholder="输入选择器" />
                                                    </Form.Item>
                                                }

                                                {
                                                    !!actionInfo[field.fieldKey]?.allowValue && <Form.Item
                                                        // {...field}
                                                        // label="Price"
                                                        style={{ width: 130 }}
                                                        name={[field.name, 'value']}
                                                        fieldKey={[field.fieldKey, 'value']}
                                                    // rules={[{ required: true, message: 'Missing Value' }]}
                                                    >
                                                        <Input allowClear placeholder="需要输入的值" />
                                                    </Form.Item>
                                                }
                                                <MinusCircleOutlined className={Styles.deleteIcon} onClick={() => { removeAction(field); remove(field.name) }} />
                                            </Input.Group>

                                        </Form.Item>
                                    </Form.Item>
                                })
                            }
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{ width: '60%' }}
                                    icon={<PlusOutlined />}
                                >
                                    新增操作项
                                </Button>
                            </Form.Item>
                        </>
                    )
                }
            </Form.List>

            <Form.Item wrapperCol={{ offset: 11, span: 13 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </div>
}