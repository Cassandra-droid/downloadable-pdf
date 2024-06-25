import Head from 'next/head';

type Props = {
  pageTitle: string;
  pageDescription: string;
  pageImageUrl: string;
  pageUrl: string;
};

const Page: React.FC<Props> = ({ pageTitle, pageDescription, pageImageUrl, pageUrl }) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImageUrl} />
      </Head>
      <div>
        <h1>{pageTitle}</h1>
        <img src={pageImageUrl} alt="Shared content" style={{ maxWidth: '100%', height: 'auto' }} />
        <p>{pageDescription}</p>
      </div>
    </>
  );
};


export const getServerSideProps = async () => {
  
  const pageTitle = 'Page Title';
  const pageDescription = 'Page Description.';
  const pageImageUrl = '/assets/table.png'; 
  const pageUrl = 'https://downloadable-pdf.vercel.app/link';

  return {
    props: {
      pageTitle,
      pageDescription,
      pageImageUrl,
      pageUrl,
    },
  };
};

export default Page;

