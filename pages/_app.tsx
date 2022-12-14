import "../styles/globals.css";
import "@fontsource/istok-web";
import type { AppProps } from "next/app";
import { GameContextProvider } from "../contexts/game";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GameContextProvider>
      <Component {...pageProps} />
    </GameContextProvider>
  );
}
