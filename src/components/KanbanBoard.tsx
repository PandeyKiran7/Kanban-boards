import  { useMemo, useState, useEffect } from "react";
import PlusIcon from "../icons/PlusIcon";
import { Columns, Id, Task } from "../types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  useSensor,
  PointerSensor,
  DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";

function KanbanBoard() {
  const [columns, setColumns] = useState<Columns[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Columns | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const sensors = [
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  ];

  let counter = 0;

  function generateId() {
    counter += 1;
    return `${Date.now()}-${counter}`;
  }

  function saveToLocalStorage() {
    localStorage.setItem("columns", JSON.stringify(columns));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Saving columns to LocalStorage:", columns);
    console.log("Saving tasks to LocalStorage:", tasks);
  }

  function loadFromLocalStorage() {
    const storedColumns = localStorage.getItem("columns");
    const storedTasks = localStorage.getItem("tasks");
    console.log("Loaded columns from LocalStorage:", storedColumns);
    console.log("Loaded tasks from LocalStorage:", storedTasks);

    if (storedColumns && storedTasks) {
      setColumns(JSON.parse(storedColumns));
      setTasks(JSON.parse(storedTasks));
    }
  }

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  useEffect(() => {
    saveToLocalStorage();
  }, [columns, tasks]);

  function createNewColumn() {
    const columnToAdd: Columns = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns((prevColumns) => [...prevColumns, columnToAdd]);
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  }

  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });
    setColumns(newColumns);
  }

  function onDragStart(e: DragStartEvent) {
    if (e.active.data.current?.type === "Column") {
      setActiveColumn(e.active.data.current.column);
      return;
    }

    if (e.active.data.current?.type === "Task") {
      setActiveTask(e.active.data.current.task);
      return;
    }
  }

  function onDragEnd(e: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = e;

    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(e: DragOverEvent) {
    const { active, over } = e;

    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveTask) return;

    if (isActiveTask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveTask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    setTasks(newTasks);
  }

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-8 bg-transparent shadow-lg">
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        sensors={sensors}
        onDragOver={onDragOver}
      >
        <div className="flex gap-6 p-8 rounded-lg shadow-xl bg-transparent">
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <div
                key={col.id}
                className={`${activeColumn?.id === col.id ? "opacity-50" : ""}`}
              >
                <ColumnContainer
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  updateTask={updateTask}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              </div>
            ))}
          </SortableContext>

          <button
            onClick={createNewColumn}
            className="h-16 w-36 min-w-[250px] cursor-pointer rounded-lg bg-green-500 border-2 border-gray-300 p-4 text-white hover:ring-2 hover:ring-green-300 transition-all ease-in-out flex items-center justify-center gap-2 mx-auto"
          >
            <PlusIcon />
            Add Column
          </button>
        </div>

        {activeColumn &&
          createPortal(
            <DragOverlay>
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
              {activeTask && (
                <TaskCard
                  task={activeTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              )}
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </div>
  );
}

export default KanbanBoard;