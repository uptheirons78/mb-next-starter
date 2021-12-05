import Head from 'next/head';

export default function Home() {
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
      </main>
    </div>
  );
}
