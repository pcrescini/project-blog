import React from 'react';
import dynamic from 'next/dynamic';

import BlogHero from '@/components/BlogHero';
import CodeSnippet from '@/components/CodeSnippet';

import { MDXRemote } from 'next-mdx-remote/rsc';
import { loadBlogPost } from '@/helpers/file-helpers';
import { BLOG_TITLE } from '@/constants';

import styles from './postSlug.module.css';

const DivisionGroupsDemo = dynamic(() =>
  import('@/components/DivisionGroupsDemo'),
);

export async function generateMetadata({ params }) {
  const href = `/${params.postSlug}`;
  const blogPost = await loadBlogPost(href);

  return {
    title: `${blogPost.frontmatter.title} • ${BLOG_TITLE}`,
    description: `${blogPost.frontmatter.abstract}`,
  };
}

async function BlogPost({ params }) {
  const href = `/${params.postSlug}`;
  const blogPost = await loadBlogPost(href);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={blogPost.frontmatter.title}
        publishedOn={blogPost.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          source={blogPost.content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
