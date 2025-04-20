import { atom } from 'jotai';

export interface CardType {
  id: string;
  title: string;
}

export interface ColumnType {
  id: string;
  title: string;
  cards: CardType[];
}

export const boardAtom = atom<ColumnType[]>([
  {
    id: 'todo',
    title: 'Todo',
    cards: [
      { id: 'card-1', title: '할 일 1' },
      { id: 'card-2', title: '할 일 2' },
    ],
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    cards: [{ id: 'card-3', title: '진행 중 1' }],
  },
  {
    id: 'done',
    title: 'Done',
    cards: [],
  },
]);
