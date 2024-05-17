import { v1 } from "uuid";
import "./App.css";
import { TodoList } from "./components/TodoList";
import { useState } from "react";
import { AddItemForm } from "./components/AddItemForm";

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

export type TaskStateType = {
  [key: string]: TaskType[];
};

function App() {
  const todolistID1 = v1();
  const todolistID2 = v1();

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, setTasks] = useState<TaskStateType>({
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

  const removeTask = (taskId: string, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId),
    });
  };

  const changeFilter = (filterValue: FilterValuesType, todolistId: string) => {
    setTodolists(
      todolists.map((el) => {
        return el.id === todolistId ? { ...el, filter: filterValue } : el;
      })
    );
  };

  const addTask = (title: string, todolistId: string) => {
    const newTask = {
      id: v1(),
      title,
      isDone: false,
    };
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
  };

  const changeTaskStatus = (
    taskId: string,
    taskStatus: boolean,
    todolistId: string
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((t) =>
        t.id === taskId ? { ...t, isDone: taskStatus } : t
      ),
    });
  };

  const removeTodolist = (todolistId: string) => {
    const newTodolist = todolists.filter((tl) => tl.id !== todolistId);
    setTodolists(newTodolist);

    delete tasks[todolistId];
    setTasks({ ...tasks });
  };

  const addTodolist = (title: string) => {
    const newTodolistId = v1();
    const newTodolist: TodolistType = {
      id: newTodolistId,
      title,
      filter: "all",
    };
    setTodolists([...todolists, newTodolist]);
    setTasks({ ...tasks, [newTodolistId]: [] });
  };

  const updateTask = (todolistId: string, taskId: string, title: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((el) =>
        el.id === taskId ? { ...el, title } : el
      ),
    });
  };

  const updateTodolist = (todolistId: string, title: string) => {
    setTodolists(
      todolists.map((el) => (el.id === todolistId ? { ...el, title } : el))
    );
  };

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
      {todolists.map((tl) => {
        const allTodolistTasks = tasks[tl.id];
        let tasksForTodolist: TaskType[] = allTodolistTasks;

        if (tl.filter === "active") {
          tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone);
        }

        if (tl.filter === "completed") {
          tasksForTodolist = allTodolistTasks.filter((task) => task.isDone);
        }

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
            removeTodolist={removeTodolist}
            updateTask={updateTask}
            updateTodolist={updateTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
