import Column from '../Column';

const Board = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gradient-to-br from-slate-100 to-slate-200 min-h-screen">
      <Column columnId="todo" />
      <Column columnId="inprogress" />
      <Column columnId="done" />
    </div>
  );
};

export default Board;
