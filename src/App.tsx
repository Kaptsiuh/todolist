import { v1 } from "uuid";
import "./App.css";
import { TodoList } from "./components/TodoList";
import { useState } from "react";
import { AddItemForm } from "./components/AddItemForm";

export type TaskType = {
  taskId: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
  todolistId: string;
  title: string;
  filter: FilterValuesType;
  tasks: TaskType[];
};

function App() {
  const [todoFromServer, setTodoFromServer] = useState<TodolistType[]>([
    {
      todolistId: v1(),
      title: "What to learn",
      filter: "all",
      tasks: [
        { taskId: v1(), title: "HTML&CSS", isDone: true },
        { taskId: v1(), title: "JS", isDone: true },
        { taskId: v1(), title: "ReactJS", isDone: false },
        { taskId: v1(), title: "Redux", isDone: false },
      ],
    },
    {
      todolistId: v1(),
      title: "What to buy",
      filter: "all",
      tasks: [
        { taskId: v1(), title: "Typescript", isDone: false },
        { taskId: v1(), title: "RTK query", isDone: false },
      ],
    },
  ]);

  const removeTask = (taskId: string, todolistId: string) => {
    setTodoFromServer(
      todoFromServer.map((todos) =>
        todos.todolistId === todolistId
          ? { ...todos, tasks: todos.tasks.filter((t) => t.taskId !== taskId) }
          : todos
      )
    );
  };

  const changeFilter = (filterValue: FilterValuesType, todolistId: string) => {
    setTodoFromServer(
      todoFromServer.map((todos) =>
        todos.todolistId === todolistId
          ? { ...todos, filter: filterValue }
          : todos
      )
    );
  };

  const addTask = (title: string, todolistId: string) => {
    const newTask = {
      taskId: v1(),
      title,
      isDone: false,
    };
    setTodoFromServer(
      todoFromServer.map((todos) =>
        todos.todolistId === todolistId
          ? { ...todos, tasks: [newTask, ...todos.tasks] }
          : todos
      )
    );
  };

  const changeTaskStatus = (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => {
    setTodoFromServer(
      todoFromServer.map((todos) =>
        todos.todolistId === todolistId
          ? {
              ...todos,
              tasks: todos.tasks.map((t) =>
                t.taskId === taskId ? { ...t, isDone } : t
              ),
            }
          : todos
      )
    );
  };

  const removeTodolist = (todolistId: string) => {
    // const newTodolist = todolists.filter((tl) => tl.id !== todolistId);
    // setTodolists(newTodolist);
    // delete tasks[todolistId];
    // setTasks({ ...tasks });
  };

  const addTodolist = (title: string) => {
    // const newTodolistId = v1();
    // const newTodolist: TodolistType = {
    //   id: newTodolistId,
    //   title,
    //   filter: "all",
    // };
    // setTodolists([...todolists, newTodolist]);
    // setTasks({ ...tasks, [newTodolistId]: [] });
  };

  const updateTask = (todolistId: string, taskId: string, title: string) => {
    // setTasks({
    //   ...tasks,
    //   [todolistId]: tasks[todolistId].map((el) =>
    //     el.id === taskId ? { ...el, title } : el
    //   ),
    // });
  };

  const updateTodolist = (todolistId: string, title: string) => {
    // setTodolists(
    //   todolists.map((el) => (el.id === todolistId ? { ...el, title } : el))
    // );
  };

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
      {todoFromServer.map((tl) => {
        const allTodolistTasks = tl.tasks;
        let tasksForTodolist: TaskType[] = allTodolistTasks;

        if (tl.filter === "active") {
          tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone);
        }

        if (tl.filter === "completed") {
          tasksForTodolist = allTodolistTasks.filter((task) => task.isDone);
        }

        return (
          <TodoList
            key={tl.todolistId}
            todolistId={tl.todolistId}
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
