import { useEffect } from "react";
import useGameStore from "./store/game";
import GameOver from "./components/GameOver";
import Cards from "./components/Cards";

const App = () => {
  const { cards, gameOver, initCards } = useGameStore();

  useEffect(() => {
    initCards();
    // eslint-disable-next-line
  }, []);

  if (!cards.length) return null;

  return (
    <>
      <Cards />
      {gameOver && <GameOver />}
    </>
  );
};

export default App;
