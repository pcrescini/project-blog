import React from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';
import { BLOG_TITLE, BLOG_DESCRIPTION } from '@/constants';
import { getBlogPostList } from '@/helpers/file-helpers';

import styles from './homepage.module.css';

const BLOG_POSTS = await getBlogPostList();

export async function generateMetadata() {
  return {
    title: `${BLOG_TITLE}`,
    description: `${BLOG_DESCRIPTION}`,
  };
}

function Home() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>
      {BLOG_POSTS.map(({ slug, title, abstract, publishedOn }) => {
        return (
          <BlogSummaryCard
            key={slug}
            slug={slug}
            title={title}
            abstract={abstract}
            publishedOn={publishedOn}
          />
        );
      })}
    </div>
  );
}

export default Home;
