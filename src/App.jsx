import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [player, setPlayer] = useState([]);
  const [board, setBoard] = useState([]);
  const [numberOfCorrect, setNumberOfCorrect] = useState(0);
  const [clicked, setClicked] = useState(-1);
  const [index, setIndex] = useState(0);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function getNumberOfCorrect() {
    let correct = 0;

    for (let i = 0; i < player.length; i++) {
      if (player[i] == board[i]) {
        correct++;
      }
    }

    return correct;
  }

  function handleClick(num, idx) {
    if (clicked == -1) {
      setClicked(num);
      setIndex(idx);
      return;
    }

    const newPlayer = [...player];
    newPlayer[idx] = clicked;
    newPlayer[index] = num;

    setPlayer([...newPlayer]);

    setClicked(-1);
  }

  useEffect(() => {
    let numbers = [1, 2, 3, 4, 5, 6];
    const player = [];
    const board = [];

    while (numbers.length > 0) {
      const index = getRandomInt(numbers.length);
      player.push(numbers.at(index));
      numbers.splice(index, 1);
    }

    numbers = [1, 2, 3, 4, 5, 6];
    while (numbers.length > 0) {
      const index = getRandomInt(numbers.length);
      board.push(numbers.at(index));
      numbers.splice(index, 1);
    }

    setBoard([...board]);
    setPlayer([...player]);
  }, []);

  useEffect(() => {
    setNumberOfCorrect(getNumberOfCorrect());
  }, [player]);

  return (
    <div className="container">
      {player.map((number, index) => (
        <div
          key={index}
          onClick={() => handleClick(number, index)}
          className="digits"
        >
          {number}
        </div>
      ))}

      <div className="score">Score: {numberOfCorrect}</div>
    </div>
  );
}

export default App;
