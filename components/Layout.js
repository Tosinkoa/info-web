import Head from "next/head";

const Layout = ({ title, keywords, description, children }) => {
  //This helps alot with SEO Ranking.
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>{children}</div>
    </div>
  );
};

export default Layout;

Layout.defaultProps = {
  title: "Afiari",
  description: "This is afiari website",
  keywords: "afiari website, afiari, afiari site",
};
