import Head from "next/head";
import { Board } from "../components/Board";

const pointFormat = new Intl.NumberFormat().format;

export default function Home() {
  return (
    <div className="overflow-auto flex bg-tripod min-h-screen min-w-screen relative">
      <Head>
        <title>Triple Pod</title>
      </Head>
      <div className="absolute w-full h-full flex items-center">
        <div className="mx-auto grid grid-cols-3 row-auto max-w-[640px] min-w-[320px] min-h-0 w-full">
          <div className="col-start-2 col-span-1 px-3 py-1 rounded-md bg-tripod-900/70 text-white text-xl text-center">
            {pointFormat(1289)}
          </div>
          <div className="col-span-3">
            <Board />
          </div>
        </div>
      </div>
      {/* <Shop /> */}
    </div>
  );
}
