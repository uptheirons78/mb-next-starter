import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Link from 'next/link';
import Head from 'next/head';

export default function SinglePost({ slug, frontmatter, content }) {
  const { title, date, cover_image, excerpt } = frontmatter;
  const html = marked.parse(content);
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        <Link href='/'>
          <a>&larr; Back home</a>
        </Link>
        <h3>{title}</h3>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8');
  const { data: frontmatter, content } = matter(markdownWithMeta);
  return {
    props: {
      slug,
      frontmatter,
      content,
    },
  };
}
