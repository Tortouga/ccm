import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useArgent, useSetArgent } from "@/context/ArgentContext";

const suits = ["♠", "♥", "♦", "♣"];
const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

const getCardValue = (card) => {
  if (["J", "Q", "K"].includes(card.value)) return 10;
  if (card.value === "A") return 11;
  return parseInt(card.value);
};

const calculateScore = (hand) => {
  let score = hand.reduce((sum, card) => sum + getCardValue(card), 0);
  let aces = hand.filter((card) => card.value === "A").length;
  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }
  return score;
};

const drawCard = () => {
  const suit = suits[Math.floor(Math.random() * suits.length)];
  const value = values[Math.floor(Math.random() * values.length)];
  return { suit, value };
};

const Blackjack = () => {
  const argent = useArgent();
  const setArgent = useSetArgent();

  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(true);

  const startGame = () => {
    if (argent < 10) return;
    setArgent((a) => a - 10);
    const hand = [drawCard(), drawCard()];
    const dealer = [drawCard()];
    setPlayerHand(hand);
    setDealerHand(dealer);
    setMessage("");
    setGameOver(false);
  };

  const hit = () => {
    const newHand = [...playerHand, drawCard()];
    setPlayerHand(newHand);
    const score = calculateScore(newHand);
    if (score > 21) {
      setMessage("💥 Tu as dépassé 21 ! Perdu.");
      setGameOver(true);
    }
  };

  const stand = () => {
    let dealer = [...dealerHand];
    while (calculateScore(dealer) < 17) {
      dealer.push(drawCard());
    }
    setDealerHand(dealer);

    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealer);

    if (dealerScore > 21 || playerScore > dealerScore) {
      setMessage("🎉 Tu gagnes ! +20€");
      setArgent((a) => a + 20);
    } else if (playerScore === dealerScore) {
      setMessage("🤝 Égalité !");
      setArgent((a) => a + 10);
    } else {
      setMessage("😢 La banque gagne.");
    }
    setGameOver(true);
  };

  const renderHand = (hand) =>
    hand.map((card, idx) => (
      <div
        key={idx}
        className="w-16 h-24 bg-white text-black border-2 border-yellow-500 rounded-md flex items-center justify-center text-xl font-bold mx-1 shadow-md"
      >
        {card.value} {card.suit}
      </div>
    ));

  return (
    <div className="flex flex-col items-center gap-6 py-10 bg-gradient-to-br from-[#0f0f0f] to-black text-yellow-300 font-cinzel">
      <h1 className="text-3xl font-bold drop-shadow-md">🃏 Blackjack</h1>
      <div className="text-lg font-semibold">💰 Argent : {argent} €</div>

      <div className="text-xl mt-4">Banque ({calculateScore(dealerHand)}):</div>
      <div className="flex">{renderHand(dealerHand)}</div>

      <div className="text-xl mt-4">Toi ({calculateScore(playerHand)}):</div>
      <div className="flex">{renderHand(playerHand)}</div>

      <div className="flex gap-4 mt-6">
        {gameOver ? (
          <Button
            onClick={startGame}
            disabled={argent < 10}
            className="bg-yellow-500 text-black font-bold"
          >
            🎲 Nouvelle partie (10€)
          </Button>
        ) : (
          <>
            <Button onClick={hit} className="bg-green-500 text-black font-bold">
              🃕 Carte
            </Button>
            <Button onClick={stand} className="bg-red-500 text-black font-bold">
              ✋ Rester
            </Button>
          </>
        )}
      </div>

      <div className="text-xl mt-4">{message}</div>
    </div>
  );
};

export default Blackjack;
