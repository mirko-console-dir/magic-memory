import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import SingleCard from "./components/SingleCard";
import {plat1,plat2,plat3,plat4,plat5,plat6} from "./assets/images.js"

const cardImages = [
  { src: plat1, matched: false },
  { src: plat2, matched: false },
  { src: plat3, matched: false },
  { src: plat4, matched: false },
  { src: plat5, matched: false },
  { src: plat6, matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  /* shuffle cards */
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };
  console.log(cards, turns);

  /* handle the choice */
  const handleChoice = (card) => {
    console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  /* compare selectedCards, use effect parte al mounted e a ogni cambiamento di choicheOne e choiceTwo */
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        console.log("match " + choiceOne.src + " " + choiceTwo.src);
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        console.log("NOT match " + choiceOne.src + " " + choiceTwo.src);
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  /* reset choices increase turn */
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  /* start new game auto mounted */
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Memory</h1>
      <button onClick={shuffleCards}>Start Game</button>
      <div className="card-grid">
        {/* pass props card images with props and pass to component function */}
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
