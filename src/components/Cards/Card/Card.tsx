import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import useGameStore, { ICard } from "../../../store/game";

const CardCmp = ({
  back,
  children,
}: Readonly<{ back?: boolean; children?: React.ReactNode }>) => {
  return (
    <div
      className={clsx(
        "absolute w-full h-full [backface-visibility:hidden] rounded-lg overflow-hidden flex items-center justify-center",
        {
          "card-front bg-[linear-gradient(150deg,#f731db,#4600f1_100%)]": !back,
          "card-back bg-[linear-gradient(150deg,#39ef74,#4600f1_100%)] [transform:rotateY(180deg)]":
            back,
        }
      )}
    >
      {children}
    </div>
  );
};

const Card = (card: Readonly<ICard>) => {
  const { flipCard, matchedCards, moves } = useGameStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [moves]);

  const isMatched = useMemo(() => {
    return !!matchedCards.find((mCard) => mCard.location === card.location);
  }, [card, matchedCards]);

  return (
    <div
      className="card w-full h-full [perspective:1000px]"
      onClick={
        isMatched
          ? undefined
          : () => {
              setOpen(true);
              flipCard(card);
            }
      }
    >
      <div
        className={clsx(
          "card-inner cursor-pointer relative w-full h-full duration-700 [transform-style:preserve-3d]",
          {
            "[transform:rotateY(180deg)]": isMatched || open,
          }
        )}
      >
        <CardCmp />
        <CardCmp back>
          <span className="text-5xl font-bold text-black uppercase select-none">
            {card.content}
          </span>
        </CardCmp>
      </div>
    </div>
  );
};

export default Card;
