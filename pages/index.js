import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { sortByDate } from '../utils';

export default function Home({ posts }) {
  return (
    <div className='container'>
      <Head>
        <title>Nextjs Starter Theme</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='main'>
        <h1 className='title'>
          Personal <a href='https://nextjs.org'>Next.js!</a> Starter Theme
        </h1>
        <section style={{ marginTop: `3rem` }}>
          {posts.map((post, index) => {
            const html = marked.parse(post.content);
            const strippedString = html.replace(/(<([^>]+)>)/gi, '');
            const excerptFromHTML = strippedString.substring(0, 180) + '...';
            return (
              <article key={index}>
                <h3>{post.frontmatter.title}</h3>
                <p>{post.frontmatter.excerpt ? post.frontmatter.excerpt : excerptFromHTML}</p>
                <Link href={`/blog/${post.slug}`}>
                  <a>Read more &rarr;</a>
                </Link>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  // return an array of files contained inside /posts directory
  const files = fs.readdirSync(path.join('posts'));
  // get slugs and frontmatter from posts
  const posts = files.map((filename) => {
    // get the slug
    const slug = filename.replace('.md', '');
    // get the frontmatter
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8');
    const { data: frontmatter, content } = matter(markdownWithMeta);

    return { slug, frontmatter, content };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
