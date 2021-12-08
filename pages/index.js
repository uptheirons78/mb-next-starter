import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { sortByDate } from '../utils';

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Nextjs Starter Theme</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <nav className='navbar mb-4'>
        <div className='container'>
          <h2 className='site-title'>CSS Library</h2>
          <p>My personal lightweight CSS library</p>
        </div>
      </nav>

      <main className='container'>
        <h1 className='pt-1 pb-1 font-xxl'>
          Personal <a href='https://nextjs.org'>Next.js!</a> Starter Theme
        </h1>
        <div className='mt-2'>
          <a href='#' className='btn-primary'>
            Button
          </a>
        </div>
        <section className='row gap-2'>
          {posts.map((post, index) => {
            const html = marked.parse(post.content);
            const strippedString = html.replace(/(<([^>]+)>)/gi, '');
            const excerptFromHTML = strippedString.substring(0, 180) + '...';
            return (
              <div key={index} className='col-12-sm col-6-md'>
                <article className='card'>
                  <h3 className='card-title'>{post.frontmatter.title}</h3>
                  <p className='card-body'>{post.frontmatter.excerpt ? post.frontmatter.excerpt : excerptFromHTML}</p>
                  <Link href={`/blog/${post.slug}`}>
                    <a className='card-link'>Read more &rarr;</a>
                  </Link>
                </article>
              </div>
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
