import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useArgent, useSetArgent } from "@/context/ArgentContext";
import { cn } from "@/lib/utils";

const symbols = [
  { icon: "🍒", name: "Cerise", gain: 10 },
  { icon: "🍋", name: "Citron", gain: 5 },
  { icon: "🔔", name: "Cloche", gain: 20 },
  { icon: "💎", name: "Diamant", gain: 50 },
  { icon: "7️⃣", name: "Sept", gain: 100 },
];

const SYMBOL_HEIGHT = 80;
const REPEAT = 20;

const Machine_à_sous = () => {
  const argent = useArgent();
  const setArgent = useSetArgent();

  const [offsets, setOffsets] = useState([0, 0, 0]);
  const [rolling, setRolling] = useState(false);
  const [message, setMessage] = useState("");
  const [results, setResults] = useState([symbols[0], symbols[1], symbols[2]]);

  const fullReel = Array(REPEAT)
    .fill(null)
    .flatMap(() => symbols);

  const spin = () => {
    if (rolling || argent < 5) return;

    setRolling(true);
    setArgent((a) => a - 5);
    setMessage("");

    const finalIndices = [
      Math.floor(Math.random() * symbols.length) + REPEAT * 5,
      Math.floor(Math.random() * symbols.length) + REPEAT * 5,
      Math.floor(Math.random() * symbols.length) + REPEAT * 5,
    ];

    const newOffsets = finalIndices.map((i) => i * SYMBOL_HEIGHT);
    setOffsets([0, 0, 0]);

    setTimeout(() => setOffsets([newOffsets[0], 0, 0]), 0);
    setTimeout(() => setOffsets([newOffsets[0], newOffsets[1], 0]), 300);
    setTimeout(() => {
      setOffsets(newOffsets);

      const finalSymbols = finalIndices.map((i) => {
        const index = i % symbols.length;
        return symbols[index];
      });

      setResults(finalSymbols);
      setRolling(false);

      const [a, b, c] = finalSymbols;
      if (a.name === b.name && b.name === c.name) {
        const gain = a.gain * 5;
        setArgent((prev) => prev + gain);
        setMessage(`🎉 Jackpot ! ${a.icon} x3 → +${gain}€`);
      } else if (a.name === b.name || b.name === c.name || a.name === c.name) {
        setArgent((prev) => prev + 10);
        setMessage(`✨ Deux symboles identiques → +10€`);
      } else {
        setMessage(`😢 Pas de gain cette fois`);
      }
    }, 600);
  };

  return (
    <div className="flex flex-col items-center gap-6 py-10 bg-gradient-to-br from-[#0f0f0f] to-black text-yellow-300 font-cinzel">
      <h1 className="text-3xl font-bold drop-shadow-md">🎰 Machine à sous</h1>
      <div className="text-lg font-semibold">💰 Argent : {argent} €</div>

      <div className="flex gap-4">
        {[0, 1, 2].map((reelIdx) => (
          <div
            key={reelIdx}
            className="h-[80px] w-[80px] overflow-hidden border-4 border-yellow-500 bg-black rounded-lg"
          >
            <div
              className="flex flex-col transition-transform duration-1000 ease-out"
              style={{ transform: `translateY(-${offsets[reelIdx]}px)` }}
            >
              {fullReel.map((s, idx) => (
                <div
                  key={idx}
                  className="h-[80px] flex items-center justify-center text-4xl text-white font-bold"
                >
                  {s?.icon || "❓"}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button
        className="bg-gradient-to-r from-yellow-400 to-red-500 text-black font-bold shadow-md hover:scale-105 transition-transform"
        onClick={spin}
        disabled={rolling || argent < 5}
      >
        {rolling ? "..." : "🎲 Lancer (5€)"}
      </Button>

      <div className="text-xl mt-4">{message}</div>
    </div>
  );
};

export default Machine_à_sous;
