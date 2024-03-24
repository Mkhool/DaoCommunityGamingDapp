import Providers from "./Providers";
import Layout from "./components/Layout";
import "./globals.css";

export const metadata = {
  title: "dappgame",
  description: "blabla",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body>
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
