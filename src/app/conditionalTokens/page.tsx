import { Coinsplit } from "../coinsplit/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Coinsplit />

      <button>split my META</button>
    </main>
  );
}
