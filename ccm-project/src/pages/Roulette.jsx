"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
<<<<<<< HEAD

export const Roulette = () => { 
=======
import {
  ArgentProvider,
  useArgent,
  useSetArgent,
} from "@/context/argentContext";

<<<<<<<< HEAD:ccm-project/src/pages/Roulette.jsx
export const Roulette = () => {
>>>>>>> V0_Cathy
  const items = [
    { name: "Diamant", rarity: "Rare", color: "bg-blue-500" },
    { name: "Netherite", rarity: "Legendary", color: "bg-yellow-400" },
    { name: "Émeraude", rarity: "Epic", color: "bg-green-500" },
    { name: "Fer", rarity: "Common", color: "bg-gray-400" },
    { name: "Charbon", rarity: "Common", color: "bg-gray-600" },
<<<<<<< HEAD
=======
========
const GameContent = () => {
  const items = [
    { name: "+35", rarity: "Rare", color: "bg-violet-500" },
    { name: "+200", rarity: "Legendaire", color: "bg-yellow-400" },
    { name: "+75", rarity: "Epic", color: "bg-pink-500" },
    { name: "-35", rarity: "Commune", color: "bg-gray-400" },
    { name: "-10", rarity: "Commune", color: "bg-gray-400" },
    { name: "-500", rarity: "FAILLITE", color: "bg-red-500" },
>>>>>>>> V0_Cathy:ccm-project/src/pages/game.jsx
>>>>>>> V0_Cathy
  ];

  const shuffle = (array) => {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const ITEM_WIDTH = 128;
  const REPEAT_COUNT = 50;

  const getRandomItem = () => {
    const weights = {
<<<<<<< HEAD
      Common: 60,
      Rare: 28,
      Epic: 10,
      Legendary: 2,
=======
      Commune: 60,
      Rare: 28,
      Epic: 8,
      Legendaire: 3,
      FAILLITE: 1,
>>>>>>> V0_Cathy
    };
    const weightedPool = items.flatMap((item) =>
      Array(weights[item.rarity]).fill(item)
    );
    return weightedPool[Math.floor(Math.random() * weightedPool.length)];
  };

  const [rolling, setRolling] = useState(false);
  const [animationItems, setAnimationItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [result, setResult] = useState(null);
  const [pendingAnim, setPendingAnim] = useState(null);
  const [measuredItemWidth, setMeasuredItemWidth] = useState(null);
<<<<<<< HEAD
  const [argent, setArgent] = useState(100);
=======
  const argent = useArgent();
  const setArgent = useSetArgent();
>>>>>>> V0_Cathy
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openCase = () => {
    if (rolling) return;

    setRolling(true);
    setResult(null);
    setOffset(0);

    let currentContainerWidth = containerWidth;
    if (containerRef.current) {
      currentContainerWidth = containerRef.current.offsetWidth;
      setContainerWidth(currentContainerWidth);
    }

    const finalItem = getRandomItem();
    const shuffledItems = shuffle(items);

    let longList = [];
    for (let i = 0; i < REPEAT_COUNT; i++) {
      longList.push(...shuffledItems);
    }

    const min = Math.floor(REPEAT_COUNT * shuffledItems.length * 0.5);
    const max = Math.floor(REPEAT_COUNT * shuffledItems.length * 0.7);
    const targetIndex = Math.floor(Math.random() * (max - min)) + min;

    longList[targetIndex] = finalItem;

    setAnimationItems(longList);
    setPendingAnim({ targetIndex, finalItem, currentContainerWidth });
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    if (!pendingAnim) return;
    let raf1, raf2;
    let cancelled = false;

    const start = () => {
      const { targetIndex, finalItem } = pendingAnim;
      let itemWidth = ITEM_WIDTH;
      try {
        const rouletteRow = containerRef.current?.querySelector(".flex");
        const firstItem = rouletteRow?.querySelector("div");
        if (firstItem) {
          const rect = firstItem.getBoundingClientRect();
          const style = window.getComputedStyle(firstItem);
          const marginLeft = parseFloat(style.marginLeft) || 0;
          const marginRight = parseFloat(style.marginRight) || 0;
          itemWidth = rect.width + marginLeft + marginRight;
        }
      } catch (e) {}

      const containerW = containerRef.current?.offsetWidth || containerWidth;
      setMeasuredItemWidth(itemWidth);

      const finalOffset =
        targetIndex * itemWidth - containerW / 2 + itemWidth / 2;

      const DURATION = 3000;
      let startTime = null;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const t = Math.min(elapsed / DURATION, 1);
        const easedT = 1 - Math.pow(1 - t, 3);

        setOffset(easedT * finalOffset);

        if (t < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setRolling(false);
          setResult(finalItem);
<<<<<<< HEAD
=======
<<<<<<<< HEAD:ccm-project/src/pages/Roulette.jsx
>>>>>>> V0_Cathy
          if (finalItem.name === "R") setArgent((a) => a - 40);
          else if (finalItem.name === "a") setArgent((a) => a - 10);
          else if (finalItem.name === "d") setArgent((a) => a + 35);
          else if (finalItem.name === "b") setArgent((a) => a + 50);
          else if (finalItem.name === "c") setArgent((a) => a + 200);
<<<<<<< HEAD
=======
========
          // Gain/perte d'argent selon le résultat
          if (finalItem.name === "-35") {
            setArgent((a) => a - 35);
          } else if (finalItem.name === "-10") {
            setArgent((a) => a - 10);
          } else if (finalItem.name === "+35") {
            setArgent((a) => a + 35);
          } else if (finalItem.name === "+75") {
            setArgent((a) => a + 75);
          } else if (finalItem.name === "+200") {
            setArgent((a) => a + 200);
          } else if (finalItem.name === "-500") {
            setArgent((a) => a - 500);
          }
>>>>>>>> V0_Cathy:ccm-project/src/pages/game.jsx
>>>>>>> V0_Cathy
          setPendingAnim(null);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (!cancelled) start();
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [pendingAnim, animationItems]);

  return (
    <div className="flex flex-col items-center gap-6 py-10 bg-gradient-to-br from-[#1a0000] to-black text-yellow-300 font-cinzel">
      <h1 className="text-3xl font-bold drop-shadow-md">🎰 Bonne chance</h1>

      <div className="text-lg font-semibold mb-2">💰 Argent : {argent} €</div>

      <Button
        className="bg-gradient-to-r from-yellow-400 to-red-500 text-black font-bold shadow-md hover:scale-105 transition-transform"
        onClick={openCase}
        disabled={rolling || containerWidth === 0}
      >
        {rolling
          ? "..."
          : containerWidth === 0
          ? "Chargement..."
          : "🎲 Tenter sa chance"}
      </Button>

      <div
        ref={containerRef}
        className="relative w-full max-w-3xl overflow-hidden border-4 border-yellow-500 rounded-md bg-black h-20"
      >
        <div className="absolute top-0 bottom-0 left-1/2 w-1 border-l-4 border-white z-10 -translate-x-1/2" />

        <div
          className="flex"
          style={{
            width: `${
              animationItems.length * (measuredItemWidth || ITEM_WIDTH)
            }px`,
            transform: `translateX(-${offset}px)`,
            transitionTimingFunction: rolling ? "unset" : "ease-out",
          }}
        >
          {animationItems.map((item, idx) => (
            <div
              key={idx}
              className={cn(
                "w-32 h-20 flex items-center justify-center text-black text-sm font-bold mx-[2px] rounded-full shadow-lg border-2 border-white",
                item.color
              )}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>

      {result && (
        <div className="text-xl font-semibold text-center mt-4">
<<<<<<< HEAD
          🎉 Tu as obtenu :{" "}
          <span className={cn(result.color, "px-2 py-1 rounded text-black")}>
=======
<<<<<<<< HEAD:ccm-project/src/pages/Roulette.jsx
          🎉 Tu as obtenu :{" "}
          <span className={cn(result.color, "px-2 py-1 rounded text-black")}>
========
          🎉 Tu as obtenu : $
          <span className={cn(result.color, "px-2 py-1 rounded text-white")}>
>>>>>>>> V0_Cathy:ccm-project/src/pages/game.jsx
>>>>>>> V0_Cathy
            {result.name} ({result.rarity})
          </span>
        </div>
      )}
    </div>
  );
};

<<<<<<< HEAD
export default Roulette;
=======
<<<<<<<< HEAD:ccm-project/src/pages/Roulette.jsx
export default Roulette;
========
const Game = () => (
  <ArgentProvider>
    <GameContent />
  </ArgentProvider>
);

export default Game;
>>>>>>>> V0_Cathy:ccm-project/src/pages/game.jsx
>>>>>>> V0_Cathy
