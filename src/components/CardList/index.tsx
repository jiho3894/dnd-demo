import { useAtom } from 'jotai';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { cardsAtom } from '../../atom';

export const CardList = () => {
  const [cards, setCards] = useAtom(cardsAtom);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newCards = Array.from(cards);
    const [removed] = newCards.splice(result.source.index, 1);
    newCards.splice(result.destination.index, 0, removed);
    setCards(newCards);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="cardList">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {cards.map((card, index) => (
              <Draggable draggableId={card.id} index={index} key={card.id}>
                {(provided) => (
                  <div
                    className="p-4 mb-2 bg-white border rounded shadow"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    {card.title}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
