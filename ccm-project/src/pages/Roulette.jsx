import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArgentProvider,
  useArgent,
  useSetArgent,
} from "@/context/argentContext";

export const Roulette = () => {
  const items = [
    { name: "+35", rarity: "Rare", color: "bg-violet-500" },
    { name: "+200", rarity: "Legendaire", color: "bg-yellow-400" },
    { name: "+75", rarity: "Epic", color: "bg-pink-500" },
    { name: "-50", rarity: "Commune", color: "bg-gray-400" },
    { name: "-25", rarity: "Commune", color: "bg-gray-400" },
    { name: "-500", rarity: "FAILLITE", color: "bg-red-500" },
  ];

  // Fonction mélange
  function shuffle(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const ITEM_WIDTH = 128; // correspond à w-32 en Tailwind
  const REPEAT_COUNT = 50;

  const getRandomItem = () => {
    const weights = {
      Commune: 50,
      Rare: 35,
      Epic: 11,
      Legendaire: 3,
      FAILLITE: 1,
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
  const argent = useArgent();
  const setArgent = useSetArgent();
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    // Optionnel: écouter redimensionnement fenêtre si responsive nécessaire
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

    // Recalcule la largeur du container juste avant l'animation
    let currentContainerWidth = containerWidth;
    if (containerRef.current) {
      currentContainerWidth = containerRef.current.offsetWidth;
      setContainerWidth(currentContainerWidth);
    }

    const finalItem = getRandomItem();

    // Mélange la liste items à chaque lancer pour l'affichage
    const shuffledItems = shuffle(items);

    // Crée une longue liste affichée, répétée à partir de shuffledItems
    let longList = [];
    for (let i = 0; i < REPEAT_COUNT; i++) {
      longList.push(...shuffledItems);
    }

    // On choisit un index aléatoire dans la partie centrale de la longue liste
    const min = Math.floor(REPEAT_COUNT * shuffledItems.length * 0.5);
    const max = Math.floor(REPEAT_COUNT * shuffledItems.length * 0.7);
    const targetIndex = Math.floor(Math.random() * (max - min)) + min;

    // Place le finalItem à la position cible
    longList[targetIndex] = finalItem;

    setAnimationItems(longList);
    // Store pending animation info; an effect will measure DOM and start it
    setPendingAnim({ targetIndex, finalItem, currentContainerWidth });
  };

  // Nettoyage si le composant est démonté
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Start pending animation after DOM has rendered animationItems
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
      } catch (e) {
        // ignore
      }

      // measure container width fresh (avoid stale value)
      const containerW = containerRef.current?.offsetWidth || containerWidth;

      // store measured item width so row CSS can use it
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
          // Gain/perte d'argent selon le résultat
          if (finalItem.name === "-50") {
            UseSetArgent((a) => a - 50);
          } else if (finalItem.name === "-25") {
            UseSetArgent((a) => a - 25);
          } else if (finalItem.name === "+35") {
            UseSetArgent((a) => a + 35);
          } else if (finalItem.name === "+75") {
            UseSetArgent((a) => a + 75);
          } else if (finalItem.name === "+200") {
            UseSetArgent((a) => a + 200);
          } else if (finalItem.name === "-500") {
            UseSetArgent((a) => a - 500);
          }
          setPendingAnim(null);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    // Two rAFs to ensure layout is stable
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
    <div className="flex flex-col items-center gap-6 py-10">
      <h1 className="text-2xl font-bold">Bonne chance</h1>

      <div className="text-lg font-semibold mb-2">Argent : {argent} €</div>

      <Button onClick={openCase} disabled={rolling || containerWidth === 0}>
        {rolling
          ? "..."
          : containerWidth === 0
          ? "Chargement..."
          : "Tenter sa chance"}
      </Button>

      <div
        ref={containerRef}
        className="relative w-full max-w-3xl overflow-hidden border border-muted rounded-md bg-background h-20"
      >
        {/* Ligne blanche au centre */}
        <div className="absolute top-0 bottom-0 left-1/2 w-1 border-l-4 border-white z-10 -translate-x-1/2" />

        {/* Roulette */}
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
                "w-32 h-20 flex items-center justify-center text-white text-sm font-semibold mx-[2px] rounded",
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
          🎉 Tu as obtenu : $
          <span className={cn(result.color, "px-2 py-1 rounded text-white")}>
            {result.name} ({result.rarity})
          </span>
        </div>
      )}
    </div>
  );
};

const Game = () => (
  <ArgentProvider>
    <Roulette />
  </ArgentProvider>
);

export default Game;
