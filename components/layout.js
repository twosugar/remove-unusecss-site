/*
 * @Description: 
 * @Date: 2021-08-19 15:38:03
 * @FilePath: /random-nickname-site/components/layout.js
 * @LastEditTime: 2021-10-12 15:48:31
 */
import Head from 'next/head'
import styles from './layout.module.css'

export const siteTitle = 'js随机生成昵称'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>随机生成昵称</title>
        <link rel="icon" href="/img/cola.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover, minimal-ui"/>
        <meta name="description" content={siteTitle}/>
        <meta name="og:title" content={siteTitle} />
        <meta name="keywords" content="web前端,拉罐,随机生成昵称,js" />
      </Head>
      <main>{children}</main>
    </div>
  )
}