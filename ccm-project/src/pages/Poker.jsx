import { useState, useEffect } from "react";
import "/src/App.css";

const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = [
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
  "A",
];

function createDeck() {
  const newDeck = [];
  for (let suit of suits) {
    for (let value of values) {
      newDeck.push({ suit, value });
    }
  }
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
}

function getSuitSymbol(suit) {
  switch (suit) {
    case "hearts":
      return "♥";
    case "diamonds":
      return "♦";
    case "clubs":
      return "♣";
    case "spades":
      return "♠";
    default:
      return "";
  }
}

function Poker() {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [result, setResult] = useState("");
  const [drawDisabled, setDrawDisabled] = useState(true);

  useEffect(() => {
    displayHand(); // initial empty render
  }, []);

  const dealInitial = () => {
    const newDeck = createDeck();
    const hand = newDeck.splice(0, 5);
    setDeck(newDeck);
    setPlayerHand(hand);
    setSelectedCards([]);
    setDrawDisabled(false);
    setResult("");
  };

  const drawCards = () => {
    const newHand = [...playerHand];
    const newDeck = [...deck];
    selectedCards.forEach((idx) => {
      newHand[idx] = newDeck.shift();
    });
    setPlayerHand(newHand);
    setDeck(newDeck);
    setSelectedCards([]);
    setDrawDisabled(true);
    evaluateHand(newHand);
  };

  const toggleCardSelection = (idx) => {
    if (drawDisabled) return;
    setSelectedCards((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const evaluateHand = (hand) => {
    const valueCount = {};
    const suitCount = {};
    const valueOrder = values;

    hand.forEach(({ value, suit }) => {
      valueCount[value] = (valueCount[value] || 0) + 1;
      suitCount[suit] = (suitCount[suit] || 0) + 1;
    });

    const counts = Object.values(valueCount).sort((a, b) => b - a);
    const isFlush = Object.values(suitCount).some((count) => count === 5);

    const valueIndices = hand
      .map(({ value }) => valueOrder.indexOf(value))
      .sort((a, b) => a - b);

    const isStraight = valueIndices.every((val, i, arr) =>
      i === 0 ? true : val === arr[i - 1] + 1
    );

    const lowStraight = ["A", "2", "3", "4", "5"];
    const isLowStraight = lowStraight.every((v) => valueCount[v]);

    let resultText = "Rien de spécial";

    if (isStraight && isFlush) resultText = "Quinte flush";
    else if (counts[0] === 4) resultText = "Carré";
    else if (counts[0] === 3 && counts[1] === 2) resultText = "Full";
    else if (isFlush) resultText = "Couleur";
    else if (isStraight || isLowStraight) resultText = "Suite";
    else if (counts[0] === 3) resultText = "Brelan";
    else if (counts[0] === 2 && counts[1] === 2) resultText = "Double paire";
    else if (counts[0] === 2) resultText = "Paire";

    setResult(`Évaluation de la main : ${resultText}`);
  };
  const displayHand = () => {
    return playerHand.map((card, idx) => {
      const isSelected = selectedCards.includes(idx);
      return (
        <div
          key={idx}
          className={`card ${card.suit} ${isSelected ? "selected" : ""}`}
          onClick={() => toggleCardSelection(idx)}
        >
          <div className="card-value top-left">
            {card.value} {getSuitSymbol(card.suit)}
          </div>
          <div className="card-value bottom-right">
            {card.value} {getSuitSymbol(card.suit)}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="poker-container">
      <h1>Five-Card Draw Poker</h1>
      <div id="player-hand">{displayHand()}</div>
      <div id="controls">
        <button onClick={dealInitial}>Distribuer</button>
        <button onClick={drawCards} disabled={drawDisabled}>
          Changer les cartes
        </button>
      </div>
      <div id="result">{result}</div>
    </div>
  );
}

export default Poker;