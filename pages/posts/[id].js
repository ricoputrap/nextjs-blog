import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

const Post = ({ postData }) => {
  return (
    <Layout>
      { postData.title }
      <br />
      { postData.id }
      <br />
      { postData.date }
    </Layout>
  )
}

// run second
const getStaticProps = ({ params }) => {
  const postData = getPostData(params.id);
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