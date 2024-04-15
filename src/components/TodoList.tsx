import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType, TaskType } from "../App";
import { Button } from "./Button";

type TodoListPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  changeFilter: (filter: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, taskStatus: boolean) => void;
  filter: FilterValuesType;
};

export const TodoList = ({
  title,
  tasks,
  removeTask,
  changeFilter,
  addTask,
  changeTaskStatus,
  filter,
}: TodoListPropsType) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addTaskHandler = () => {
    if (taskTitle.trim() !== "") {
      addTask(taskTitle.trim());
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
    changeFilter(filter);
  };

  return (
    <div>
      <h3>{title}</h3>
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
              removeTask(task.id);
            };

            const changeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              const newStatusValue = e.currentTarget.checked;
              changeTaskStatus(task.id, newStatusValue);
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
