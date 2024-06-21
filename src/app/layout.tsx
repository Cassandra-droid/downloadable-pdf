import React, { ReactNode } from "react";
import Head from "next/head";
import styles from "@/app/layout.module.css";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title></title>
      </Head>
      <html lang="en">
        <body>
          <div className={styles.container}>
            <header className={styles.header}></header>
            <main className={styles.main}>{children}</main>
            <footer className={styles.footer}></footer>
          </div>
        </body>
      </html>
    </>
  );
};

export default Layout;
