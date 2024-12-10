import { orderBy } from "lodash";
import useGameStore from "../../store/game";
import Card from "./Card";

const Cards = () => {
  const { cards } = useGameStore();

  return (
    <div className={`h-screen w-[840px] mx-auto grid grid-cols-5 gap-2 p-4`}>
      {orderBy(cards, "location").map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

export default Cards;
