import Styles from './search-input.module.css'
import { Input } from 'antd';
import { useState } from 'react';
import { post } from '../../lib/request'

const { Search } = Input;

export default function SearchInput() {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    const onSearch = () => {
        setLoading(true)
        post('/api/getNickName')
        .then(res => {
            setName(res.text)
            setLoading(false)
        })
    }

    return <div className={Styles.container}>
        <h1 className={Styles.title}>随机昵称生成</h1>
        <Search className={Styles.search} size="large" value={name} enterButton="点我" placeholder="愤怒的小鸟" loading={loading} onSearch={onSearch}/>
    </div>
}