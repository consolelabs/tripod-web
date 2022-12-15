import Head from "next/head";
import React from "react";
import { WEB_URL } from "../envs";

export const SEO = () => {
  return (
    <Head>
      <title>Triple Pod - Build yourself a city</title>
      <meta name="title" content="Triple Pod - Build yourself a city" />
      <meta
        name="description"
        content="Triple Pod is a match-3 game where players progress by combining 3 pieces of the same type to get the next piece, all the way to the top."
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={WEB_URL} />
      <meta property="og:title" content="Triple Pod - Build yourself a city" />
      <meta
        property="og:description"
        content="Triple Pod is a match-3 game where players progress by combining 3 pieces of the same type to get the next piece, all the way to the top."
      />
      <meta
        property="og:image"
        content={`${WEB_URL}/horizontal-wallpaper.jpg`}
      />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={WEB_URL} />
      <meta
        property="twitter:title"
        content="Triple Pod - Build yourself a city"
      />
      <meta
        property="twitter:description"
        content="Triple Pod is a match-3 game where players progress by combining 3 pieces of the same type to get the next piece, all the way to the top."
      />
      <meta
        property="twitter:image"
        content={`${WEB_URL}/horizontal-wallpaper.jpg`}
      />
    </Head>
  );
};
