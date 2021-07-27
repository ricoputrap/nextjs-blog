import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";

import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";

const Todos = ({
  data
}: {
  data: {
    userId: number
    id: number
    title: string
    completed: boolean
  }[]
}) => {
  return (
    <Layout>
      <Head>
        <title>Todos</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>
          Hello. This page shows a bunch of todo list items from {' '}
          <a href="https://jsonplaceholder.typicode.com/">JSON Placeholder Typicode</a>
        </p>
      </section>

      <section className={utilStyles.padding1px}>
        {data.map(item => (
          <div key={item.id}>
            <input type="checkbox" name={`completed-${item.id}`} id={`cb-${item.id}`} checked={item.completed} readOnly />
            <span>{ item.title }</span>
          </div>
        ))}
      </section>
    </Layout>
  )
}

const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();

  return { props: { data } }
}

export default Todos;
export { getServerSideProps }