# Kanban Board Project

This project is a Kanban Board built with React and the @dnd-kit library for drag-and-drop functionality. The board allows users to manage tasks across different columns interactively. The project also uses local storage to persist the board's state across browser sessions.

## Features
Create new columns and tasks dynamically.

Drag and drop columns and tasks to reorder them.

Edit and delete columns and tasks.

Persist data using local storage.

Responsive design with a modern UI.

## Technologies Used

React: Frontend library for building UI components.

@dnd-kit: Library for implementing drag-and-drop functionality.

TypeScript: For type safety.

CSS: Custom styles for a clean, responsive layout.

# Project Structure
├── src
│   ├── components
│   │   ├── KanbanBoard.tsx
│   │   ├── ColumnContainer.tsx
│   │   ├── TaskCard.tsx
|   |   |___Navbar.tsx 
|   |   |___Footer.tsx 
│   └── icons
│       ├── PlusIcon.tsx
│       └── SearchIcon.tsx
│       └── TrashIcon.tsx
│
├── types
│   └── index.d.ts
├── App.tsx
└── index.tsx

# Main Components:

KanbanBoard.tsx: The main component that manages the state of the columns and tasks.

ColumnContainer.tsx: A component representing a single column on the Kanban board.

TaskCard.tsx: A component representing a single task within a column.

## Functionalities
1. Adding New Columns
The "Add Column" button allows users to create a new column. Each column has a unique ID generated using the generateId function.

function createNewColumn() {
  const columnToAdd: Columns = {
    id: generateId(),
    title: `Column ${columns.length + 1}`,
  };
  setColumns((prevColumns) => [...prevColumns, columnToAdd]);
}

2. Deleting Columns

Users can delete a column by clicking the delete button. This also removes any tasks associated with that column.

function deleteColumn(id: Id) {
  const filteredColumns = columns.filter((col) => col.id !== id);
  setColumns(filteredColumns);

  const newTasks = tasks.filter((t) => t.columnId !== id);
  setTasks(newTasks);
}

3. Adding Tasks

Users can add tasks to any column using the "Add Task" feature.

function createTask(columnId: Id) {
  const newTask: Task = {
    id: generateId(),
    columnId,
    content: `Task ${tasks.length + 1}`,
  };
  setTasks([...tasks, newTask]);
}

4. Drag-and-Drop Functionality

The project uses the @dnd-kit library to provide drag-and-drop functionality. The DndContext component handles drag events.

<DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} sensors={sensors} onDragOver={onDragOver}>
  <SortableContext items={columnsId}>
    {columns.map((col) => (
      <div key={col.id} className={`${activeColumn?.id === col.id ? "opacity-50" : ""}`}>
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
</DndContext>

5. Local Storage Integration

The Kanban board's state is saved to local storage to persist data across sessions.

function saveToLocalStorage() {
  localStorage.setItem("columns", JSON.stringify(columns));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadFromLocalStorage() {
  const storedColumns = localStorage.getItem("columns");
  const storedTasks = localStorage.getItem("tasks");

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

## Custom Styles

The project uses custom CSS for styling. The "Add Column" button has been centered using the mx-auto class:

<button
  onClick={createNewColumn}
  className="h-16 w-36 min-w-[250px] cursor-pointer rounded-lg bg-green-500 border-2 border-gray-300 p-4 text-white hover:ring-2 hover:ring-green-300 transition-all ease-in-out flex items-center justify-center gap-2 mx-auto"
>
  <PlusIcon />
  Add Column
</button>

# Getting Started

## Prerequisites

Make sure you have the following installed:

Node.js

npm or yarn

### Installation

1. Clone the repository:
git clone https://github.com/your-repo/kanban-board.git

2. Navigate to the project directory:
cd kanban-board
3. Install Dependencies:
npm install
4. Start the development server:
npm run dev

# Deployment

To deploy the project, follow the guidelines for your preferred hosting platform (Netlify, Vercel, etc.).

# Future Enhancements

Add authentication to manage user-specific boards.

Integrate with a backend to sync data across devices.

Add more advanced drag-and-drop features (e.g., task grouping).

Improve the UI/UX with more animations and themes.

# Credits

Icons by Heroicons.
Drag-and-drop functionality by @dnd-kit.

# Live Demo link: 



# License

This project is licensed under the MIT License.
