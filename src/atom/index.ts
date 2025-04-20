import { atom } from 'jotai';

export interface CardType {
  id: string;
  title: string;
}

export const cardsAtom = atom<CardType[]>([
  { id: '1', title: '카드 1번' },
  { id: '2', title: '카드 2번' },
  { id: '3', title: '카드 3번' },
]);
