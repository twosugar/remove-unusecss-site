/*
 * @Description: 
 * @Date: 2021-08-19 15:38:03
 * @FilePath: /self-resume-nodejs/components/layout.js
 * @LastEditTime: 2021-09-29 18:50:01
 */
import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Image from 'next/image'

export const siteTitle = '拉罐的web前端个人简历'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Web前端工程师简历</title>
        <link rel="icon" href="/img/cola.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover, minimal-ui"/>
        <meta name="description" content={siteTitle}/>
        <meta name="og:title" content={siteTitle} />
        <meta name="keywords" content="web前端,拉罐,唐瑜,web前端个人简历,前端开发简历网站,唐瑜的简历,前端工程师简历,web前端开发,web前端工程师" />
        <script src="https://cdn.bootcdn.net/ajax/libs/particles.js/2.0.0/particles.min.js"></script>
      </Head>
      <main>{children}</main>
    </div>
  )
}