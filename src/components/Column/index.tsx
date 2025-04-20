import { useDrop } from 'react-dnd';
import { useAtom } from 'jotai';
import { boardAtom } from '../../atom';
import { useEffect, useRef } from 'react';
import { ItemType } from '../../constants';
import Card from '../Card';

const Column = ({ columnId }: { columnId: string }) => {
  const [columns, setColumns] = useAtom(boardAtom);
  const column = columns.find((col) => col.id === columnId)!;

  const dropRef = useRef<HTMLDivElement | null>(null);

  const [, connectDrop] = useDrop({
    accept: ItemType.CARD,
    drop: (item: { id: string }) => {
      const draggedCardId = item.id;

      let sourceColIndex = -1;
      let cardToMove = null;

      columns.forEach((col, colIndex) => {
        const found = col.cards.find((c) => c.id === draggedCardId);
        if (found) {
          sourceColIndex = colIndex;
          cardToMove = found;
        }
      });

      if (!cardToMove) return;

      if (columns[sourceColIndex].id === columnId) return;

      const updatedColumns = [...columns];
      updatedColumns[sourceColIndex].cards = updatedColumns[sourceColIndex].cards.filter((c) => c.id !== draggedCardId);
      const destColIndex = updatedColumns.findIndex((col) => col.id === columnId);
      updatedColumns[destColIndex].cards = [...updatedColumns[destColIndex].cards, cardToMove];

      setColumns(updatedColumns);
    },
  });

  useEffect(() => {
    if (dropRef.current) {
      connectDrop(dropRef.current);
    }
  }, [connectDrop]);

  return (
    <div
      ref={dropRef}
      className="bg-white rounded-2xl shadow-lg p-4 min-h-[300px] flex flex-col hover:shadow-xl transition">
      <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-3">{column.title}</h2>
      <div className="flex flex-col gap-2">
        {column.cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Column;
