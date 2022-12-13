import { Board } from "../components/Board";
import { Stats } from "../components/Stats";

export default function Home() {
  return (
    <div className="overflow-auto flex justify-center items-center bg-tripod h-screen w-screen">
      <Stats />
      <Board />
      {/* <Shop /> */}
    </div>
  );
}
