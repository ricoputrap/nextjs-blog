import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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
      ...matterResult.data
    }
  });

  // sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) return 1;
    else if (a > b) return -1;
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

const getPostData = id => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // combine the data with the id
  return {
    id,
    ...matterResult.data
  }
}

export { getSortedPostsDataFromFileSystem, getAllPostIds, getPostData };