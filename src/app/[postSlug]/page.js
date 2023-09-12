import React from 'react';

import BlogHero from '@/components/BlogHero';

import { MDXRemote } from 'next-mdx-remote/rsc';
import { loadBlogPost } from '@/helpers/file-helpers';

import styles from './postSlug.module.css';

async function BlogPost({ params }) {
  const href = `/${params.postSlug}`;
  const blogPost = await loadBlogPost(href);
  console.log(blogPost);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={blogPost.frontmatter.title}
        publishedOn={blogPost.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={blogPost.content} />
      </div>
    </article>
  );
}

export default BlogPost;
