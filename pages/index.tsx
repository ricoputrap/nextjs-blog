import Head from "next/head"
import Link from "next/link"
import { GetStaticProps } from "next"

import Date from "../components/date"
import Layout, { siteTitle } from "../components/layout"
import utilStyles from "../styles/utils.module.css"
import { getSortedPostsDataFromFileSystem } from "../lib/posts"

const Home = ({ 
  allPostsData 
} : {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) => {
  return (
    <Layout home>
      <Head>
        <title>{ siteTitle }</title>
      </Head>

      {/* Intro Paragraph */}
      <section className={utilStyles.headingMd}>
        <p>Hello, my name is Rico Putra. I'm a frontend web developer focusing on React JS. Anyway, I also code backend using python, specifically Flask. Let's make something fun with me!</p>
        <p>
          (This is a sample website - you'll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      {/* Blog Posts */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={ utilStyles.listItem } key={ id }>
              <Link href={`/posts/${id}`}>
                <a>{ title }</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

/**
 * An async function to do an/some async operations to 
 * prepare some static props for Home component 
 * that will be called before the component is rendered 
 * and returned as props for it
 * @returns prepared `props` for the Home component
 */
const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsDataFromFileSystem();
  return {
    props: { allPostsData }
  }
}

export default Home;
export { getStaticProps };