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
  filter: FilterValuesType;
};

function App() {
  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, setTasks] = useState({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "Typescript", isDone: false },
      { id: v1(), title: "RTK query", isDone: false },
    ],
  });

  // const [tasks, setTasks] = useState<TaskType[]>([
  //   { id: v1(), title: "HTML&CSS", isDone: true },
  //   { id: v1(), title: "JS", isDone: true },
  //   { id: v1(), title: "ReactJS", isDone: false },
  //   { id: v1(), title: "Redux", isDone: false },
  //   { id: v1(), title: "Typescript", isDone: false },
  //   { id: v1(), title: "RTK query", isDone: false },
  // ]);

  const removeTask = (taskId: string) => {
    const filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });
    setTasks(filteredTasks);
  };

  const changeFilter = (filterValue: FilterValuesType, todolistId: string) => {
    setTodolists(
      todolists.map((el) => {
        return el.id === todolistId ? { ...el, filter: filterValue } : el;
      })
    );
  };

  const addTask = (title: string) => {
    const newTask = {
      id: v1(),
      title,
      isDone: false,
    };
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  };

  const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
    const newState = tasks.map((t) =>
      t.id === taskId ? { ...t, isDone: taskStatus } : t
    );
    setTasks(newState);
  };

  return (
    <div className="App">
      {todolists.map((tl) => {
        const tasksForTodolist: TaskType[] =
          tl.filter === "active"
            ? tasks.filter((task) => !task.isDone)
            : tl.filter === "completed"
            ? tasks.filter((task) => task.isDone)
            : tasks;

        return (
          <TodoList
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={tl.filter}
          />
        );
      })}
    </div>
  );
}

export default App;
