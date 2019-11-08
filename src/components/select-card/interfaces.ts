import { ICard } from '../../views/game/interfaces';

export interface ISelectCard {
    flipCard: (card: ICard) => void;
    cards: ICard[];
}