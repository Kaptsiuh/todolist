import { v1 } from "uuid";
import "./App.css";
import { TodoList } from "./components/TodoList";
import { useState } from "react";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
  id: string;
  title: string;
};

export type TaskDataStateType = {
  data: TaskType[];
  filter: FilterValuesType;
};

export type TaskStateType = {
  [key: string]: TaskDataStateType;
};

function App() {
  const todolistID1 = v1();
  const todolistID2 = v1();

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistID1, title: "What to learn" },
    { id: todolistID2, title: "What to buy" },
  ]);

  let [tasks, setTasks] = useState<TaskStateType>({
    [todolistID1]: {
      data: [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Redux", isDone: false },
      ],
      filter: "all",
    },
    [todolistID2]: {
      data: [
        { id: v1(), title: "Typescript", isDone: false },
        { id: v1(), title: "RTK query", isDone: false },
      ],
      filter: "all",
    },
  });

  const removeTask = (taskId: string, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: {
        ...tasks[todolistId],
        data: tasks[todolistId].data.filter((t) => t.id !== taskId),
      },
    });
  };

  const changeFilter = (filterValue: FilterValuesType, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: {
        ...tasks[todolistId],
        filter: filterValue,
      },
    });
  };

  const addTask = (title: string, todolistId: string) => {
    const newTask = {
      id: v1(),
      title,
      isDone: false,
    };
    setTasks({
      ...tasks,
      [todolistId]: {
        ...tasks[todolistId],
        data: [newTask, ...tasks[todolistId].data],
      },
    });
  };

  const changeTaskStatus = (
    taskId: string,
    taskStatus: boolean,
    todolistId: string
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: {
        ...tasks[todolistId],
        data: tasks[todolistId].data.map((t) =>
          t.id === taskId ? { ...t, isDone: taskStatus } : t
        ),
      },
    });
  };

  const removeTodolist = (todolistId: string) => {
    const newTodolist = todolists.filter((tl) => tl.id !== todolistId);
    setTodolists(newTodolist);
    delete tasks[todolistId];
    setTasks({ ...tasks });
  };

  return (
    <div className="App">
      {todolists.map((tl) => {
        return (
          <TodoList
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={tasks[tl.id].data}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={tasks[tl.id].filter}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
