import Script from "next/script";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script defer src="/your-path-to-fontawesome/js/solid.js"></Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
