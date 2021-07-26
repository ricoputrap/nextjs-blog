import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from  'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

const getSortedPostsDataFromFileSystem = () => {
  
  // get file names under `/posts` folder
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {

    // remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string })
    }
  });

  // sort posts by date
  return allPostsData.sort(({ date: dateOfFirstPost }, { date: dateOfSecondPost }) => {
    if (dateOfFirstPost < dateOfSecondPost) return 1;
    else if (dateOfFirstPost > dateOfSecondPost) return -1;
    return 0;
  })
}

/**
 * @returns `[ { params: { id: 'pre-render' }}, { params: { id: 'ssg-ssr' }} ]`
 */
const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

const getPostData = async (id: string) => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // combine the data with the id & contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string })
  }
}

export { getSortedPostsDataFromFileSystem, getAllPostIds, getPostData };