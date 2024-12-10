import useGameStore from "../../store/game";

const GameOver = () => {
  const { moves, startGame } = useGameStore();

  //   background-color: #FBAB7E;
  // background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);

  return (
    <div className="game-over fixed w-screen h-screen top-0 left-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
      <div className="w-[600px] h-[400px] rounded-3xl bg-[linear-gradient(62deg,#FBAB7E_0%,#F7CE68_100%)] flex flex-col items-center justify-center animate-backtofront">
        <p className="text-5xl font-bold uppercase mb-4">game over</p>
        <p className="text-lg font-medium uppercase">Moves: {moves}</p>
        <p className="text-lg font-medium uppercase mb-10">Time: 15mins</p>
        <button
          className="uppercase p-[15px_25px] text-[24px] cursor-pointer text-white bg-[#04AA6D] rounded-[15px] shadow-[0_9px_#999] hover:bg-[#3e8e41] active:bg-[#3e8e41] active:shadow-[0_5px_#666] active:[transform:translateY(4px)]"
          onClick={startGame}
        >
          start game
        </button>
      </div>
    </div>
  );
};

export default GameOver;
