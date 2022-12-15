import "../styles/globals.css";
import "@fontsource/sen";
import "@fontsource/sen/700.css";
import "@fontsource/sen/800.css";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";

import type { AppProps } from "next/app";
import { GameContextProvider } from "../contexts/game";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GameContextProvider>
      <Component {...pageProps} />
      <ToastContainer theme="dark" autoClose={3000} />
    </GameContextProvider>
  );
}
