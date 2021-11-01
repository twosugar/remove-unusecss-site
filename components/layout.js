/*
 * @Description: 
 * @Date: 2021-08-19 15:38:03
 * @FilePath: /remove-unusecss-site/components/layout.js
 * @LastEditTime: 2021-11-01 17:53:48
 */
import Head from 'next/head'
import styles from './layout.module.css'

export const siteTitle = '移除不必要的css，提取关键css'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>移除不必要的css，提取关键css</title>
        <link rel="icon" href="/img/cola.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover, minimal-ui"/>
        <meta name="description" content={siteTitle}/>
        <meta name="og:title" content={siteTitle} />
        <meta name="keywords" content="web前端,拉罐,移除不必要的css,提取关键css,puppeteer" />
      </Head>
      <main>{children}</main>
    </div>
  )
}