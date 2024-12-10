import { create } from "zustand";
import Randomstring from "randomstring";

export interface ICard {
  id: string;
  location: number;
  content: any;
}

export const COLUMNS = 5;
export const ROWS = 4;

const generateCards = () => {
  const cardsCount = COLUMNS * ROWS;
  const cards: ICard[] = [];

  const getLocation = (): number => {
    const locations: number[] = cards.map((card) => card.location);
    const location = Math.floor(Math.random() * cardsCount) || cardsCount;

    return locations.includes(location) ? getLocation() : location;
  };

  for (let i = 1; i <= cardsCount; i++) {
    const c = i > cardsCount / 2 ? i - cardsCount / 2 : i;

    cards.push({
      id: Randomstring.generate(),
      content: `./assets/images/${c}.jpeg`,
      location: getLocation(),
    });
  }

  return cards;
};

const useGameStore = create<{
  cards: ICard[];
  moves: number;
  matchedCards: ICard[];
  currentCard?: ICard;
  gameOver?: boolean;
  startGame: () => void;
  initCards: () => void;
  flipCard: (card: ICard) => void;
}>()((set, get) => ({
  cards: [],
  moves: 0,
  matchedCards: [],
  currentCard: undefined,
  gameOver: false,
  startGame: () =>
    set({
      matchedCards: [],
      currentCard: undefined,
      moves: 0,
      gameOver: false,
    }),
  initCards: () => set({ cards: generateCards() }),
  flipCard: (card) => {
    setTimeout(() => {
      const currentCard = get().currentCard;

      if (!currentCard) {
        set({ currentCard: card });
        return;
      }

      // same card
      if (card.id === currentCard.id) return;

      // match found
      if (currentCard.content === card.content) {
        const matchedCards = [...get().matchedCards, currentCard, card];
        set({
          matchedCards,
          currentCard: undefined,
          moves: get().moves + 1,
          gameOver: matchedCards.length === get().cards.length,
        });
        return;
      }

      set({ currentCard: undefined, moves: get().moves + 1 });
    }, 550);
  },
}));

export default useGameStore;
