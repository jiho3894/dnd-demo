import { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { ItemType } from '../../constants';

const Card = ({ card }: { card: { id: string; title: string } }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemType.CARD,
    item: { id: card.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const divRef = useRef<HTMLDivElement>(null);
  const combinedRef = (node: HTMLDivElement | null) => {
    dragRef(node);
    divRef.current = node;
  };

  return (
    <div
      ref={combinedRef}
      className={`bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-gray-800 cursor-move transition ${
        isDragging ? 'opacity-40' : ''
      }`}>
      {card.title}
    </div>
  );
};

export default Card;
