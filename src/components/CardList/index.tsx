import { useAtom } from 'jotai';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { boardAtom } from '../../atom';

export const Board = () => {
  const [columns, setColumns] = useAtom(boardAtom);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColIndex = columns.findIndex((col) => col.id === source.droppableId);
    const destColIndex = columns.findIndex((col) => col.id === destination.droppableId);

    const sourceCol = columns[sourceColIndex];
    const destCol = columns[destColIndex];

    const draggedCard = sourceCol.cards[source.index];

    // 같은 컬럼 내 이동
    if (source.droppableId === destination.droppableId) {
      const updatedCards = [...sourceCol.cards];
      updatedCards.splice(source.index, 1);
      updatedCards.splice(destination.index, 0, draggedCard);

      const updatedColumns = [...columns];
      updatedColumns[sourceColIndex] = { ...sourceCol, cards: updatedCards };
      setColumns(updatedColumns);
    } else {
      // 컬럼 간 이동
      const sourceCards = [...sourceCol.cards];
      const destCards = [...destCol.cards];

      sourceCards.splice(source.index, 1);
      destCards.splice(destination.index, 0, draggedCard);

      const updatedColumns = [...columns];
      updatedColumns[sourceColIndex] = { ...sourceCol, cards: sourceCards };
      updatedColumns[destColIndex] = { ...destCol, cards: destCards };

      setColumns(updatedColumns);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-4 p-4 h-screen bg-gray-100">
        {columns.map((column) => (
          <Droppable droppableId={column.id} key={column.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-white rounded shadow p-4 flex flex-col">
                <h2 className="text-lg font-bold mb-4">{column.title}</h2>
                {column.cards.map((card, index) => (
                  <Draggable draggableId={card.id} index={index} key={card.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-blue-100 border border-blue-300 rounded px-3 py-2 mb-2 shadow-sm">
                        {card.title}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};
