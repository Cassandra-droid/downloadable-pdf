import Head from "next/head";

const Page: React.FC = () => {
  return (
    <>
      <Head>
        <title>Link Page</title>
        <meta property="og:title" content="Link Page" />
        <meta property="og:description" content=" Rich Link Preview Demo." />
        <meta
          property="og:image"
          content="https://downloadable-pdf.vercel.app/assets/header.png"
        />
        <meta
          property="og:url"
          content="https://downloadable-pdf.vercel.app/link"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div>
        <h1>Your Specified Page Content</h1>
      </div>
    </>
  );
};

export default Page;
