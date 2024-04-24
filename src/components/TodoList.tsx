import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType, TaskType } from "../App";
import { Button } from "./Button";

type TodoListPropsType = {
  title: string;
  todolistId: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (filter: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    taskStatus: boolean,
    todolistId: string
  ) => void;
  removeTodolist: (todolistId: string) => void;
  filter: FilterValuesType;
};

export const TodoList = ({
  title,
  tasks,
  todolistId,
  removeTask,
  changeFilter,
  addTask,
  changeTaskStatus,
  filter,
  removeTodolist,
}: TodoListPropsType) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  // todo: перенести из App;
  // const tasksForTodolist: TaskType[] =
  //   filter === "active"
  //     ? tasks.filter((task) => !task.isDone)
  //     : filter === "completed"
  //     ? tasks.filter((task) => task.isDone)
  //     : tasks;

  const addTaskHandler = () => {
    if (taskTitle.trim() !== "") {
      addTask(taskTitle.trim(), todolistId);
      setTaskTitle("");
    } else {
      setError("Title is required");
    }
  };

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value);
  };

  const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === "Enter") {
      addTaskHandler();
    }
  };

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    changeFilter(filter, todolistId);
  };

  const removeTodolistHandler = () => {
    removeTodolist(todolistId);
  };

  return (
    <div>
      <h3>{title}</h3>
      <Button title={"x"} onClickHandler={removeTodolistHandler} />
      <div>
        <input
          className={error ? "error" : ""}
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyUp={addTaskOnKeyUpHandler}
        />
        <Button title={"+"} onClickHandler={addTaskHandler} />
        {error && <div className={"error-message"}>{error}</div>}
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const removeTaskHandler = () => {
              removeTask(task.id, todolistId);
            };

            const changeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              const newStatusValue = e.currentTarget.checked;
              changeTaskStatus(task.id, newStatusValue, todolistId);
            };

            return (
              <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={changeTaskStatusHandler}
                />
                <span>{task.title}</span>
                <Button title={"x"} onClickHandler={removeTaskHandler} />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button
          className={filter === "all" ? "active-filter" : ""}
          title={"All"}
          onClickHandler={() => changeFilterTasksHandler("all")}
        />
        <Button
          className={filter === "active" ? "active-filter" : ""}
          title={"Active"}
          onClickHandler={() => changeFilterTasksHandler("active")}
        />
        <Button
          className={filter === "completed" ? "active-filter" : ""}
          title={"Completed"}
          onClickHandler={() => changeFilterTasksHandler("completed")}
        />
      </div>
    </div>
  );
};
