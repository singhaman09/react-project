import { useDrag, useDrop } from "react-dnd";

//collect is a function that collects the state of the drag-and-drop operation

export const useDraggable = (type, item) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),

      // monitor.isDragging()   // could return undefined in some edge cases
      // !!monitor.isDragging() // always true or false
    }),
  }));

  return { isDragging, drag };
};

export const useDroppable = (type, onDrop) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: type,
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return { isOver, drop };
};
