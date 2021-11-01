import Layout from '../components/layout'
import { Menu } from 'antd'
import SearchInput from '../components/home/SearchInput'

export default function Home({ initialState }) {
  return (
    <Layout>
      <Menu mode="horizontal">
        <Menu.Item key="github">
          <a href="https://github.com/twosugar/remove-unusecss-site" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </Menu.Item>
        <Menu.Item key="home">
          <a href="http://www.sugarfish.top:3000/" target="_blank" rel="noopener noreferrer">
            个人主页
          </a>
        </Menu.Item>
      </Menu>
      <div>
          <SearchInput />
      </div>
    </Layout>
  )
}