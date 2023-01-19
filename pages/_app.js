import "../styles/globals.css";
import "../styles/main.css";
import "../styles/nprogress.css";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";
import nProgress from "nprogress";
import { ChakraProvider } from "@chakra-ui/react";
import { GlobalProvider } from "../context/GlobalContext";
import Script from "next/script";

//Router events
Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <GlobalProvider>
        <Script async 
         src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9166716457553506"
         crossOrigin="anonymous">
        </Script>
        
        <Component {...pageProps} />
      </GlobalProvider>
    </ChakraProvider>
  );
}

export default MyApp;
