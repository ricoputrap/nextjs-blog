import Head from 'next/head';
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

const Post = ({ postData }) => {
  return (
    <Layout>
      <Head>
        <title>{ postData.title }</title>
      </Head>

      { postData.title }
      <br />
      { postData.id }
      <br />
      <Date dateString={ postData.date } />
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  )
}

// run second
const getStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData
    }
  }
}

// run first
const getStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  }
}

export default Post;
export { getStaticPaths, getStaticProps }