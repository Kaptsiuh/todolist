import { v1 } from "uuid";
import "./App.css";
import TodoList from "./components/TodoList";
import { useState } from "react";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
    { id: v1(), title: "Typescript", isDone: false },
    { id: v1(), title: "RTK query", isDone: false },
  ]);

  const removeTask = (taskId: string) => {
    const filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });
    setTasks(filteredTasks);
  };

  const [filter, setFilter] = useState<FilterValuesType>("all");

  const tasksForTodolist: TaskType[] =
    filter === "active"
      ? tasks.filter((task) => !task.isDone)
      : filter === "completed"
      ? tasks.filter((task) => task.isDone)
      : tasks;

  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter);
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

  return (
    <div className="App">
      <TodoList
        title={"What to learn"}
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
