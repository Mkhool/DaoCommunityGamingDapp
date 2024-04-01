import Providers from "./Providers";
import Layout from "./components/Layout";
import "./globals.css";

export const metadata = {
  title: "UnityQuest",
  description: "Dans cette quête palpitante, l'unité et la collaboration sont de mise. Faites équipe avec des compagnons de jeu du monde entier pour surmonter les obstacles les plus redoutables et remporter des récompenses exclusives. ",
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
