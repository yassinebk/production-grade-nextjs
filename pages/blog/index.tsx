import React from 'react'
import fs from 'fs'
import { Pane, majorScale } from 'evergreen-ui'
import matter from 'gray-matter'
import path from 'path'
import orderby from 'lodash.orderby'
import Container from '../../components/container'
import HomeNav from '../../components/homeNav'
import PostPreview from '../../components/postPreview'
import { posts as postsFromCMS } from '../../content'

const Blog = ({ posts }) => {
  return (
    <Pane>
      <header>
        <HomeNav />
      </header>
      <main>
        <Container>
          {posts.map((post) => (
            <Pane key={post.title} marginY={majorScale(5)}>
              <PostPreview post={post} />
            </Pane>
          ))}
        </Container>
      </main>
    </Pane>
  )
}
export function getStaticProps() {
  const cmsPosts = postsFromCMS.published.map((p) => {
    const { data } = matter(p)
    return data;
  })

  const filePaths = path.join(process.cwd(), 'posts')
  const fileNames = fs.readdirSync(filePaths)
  const filePosts = fileNames.map((name) => {
    const fullPath = path.join(filePaths, name)
    const file = fs.readFileSync(fullPath, 'utf-8')
    console.log(file)
    const { data } = matter(file)
    return data
  })

  const posts = [...cmsPosts, ...filePosts]

  return {
    props: {
      posts,
    },
  }
}
Blog.defaultProps = {
  posts: [],
}

export default Blog

/**
 * Need to get the posts from the
 * fs and our CMS
 */
