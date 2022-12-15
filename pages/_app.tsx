import "../styles/globals.css";
import "@fontsource/sen";
import "@fontsource/sen/700.css";
import "@fontsource/sen/800.css";
import type { AppProps } from "next/app";
import { GameContextProvider } from "../contexts/game";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GameContextProvider>
      <Component {...pageProps} />
    </GameContextProvider>
  );
}
