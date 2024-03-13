import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType, TaskType } from "../App";
import { Button } from "./Button";

type TodoListPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  changeFilter: (filter: FilterValuesType) => void;
  addTask: (title: string) => void;
};

const TodoList = ({
  title,
  tasks,
  removeTask,
  changeFilter,
  addTask,
}: TodoListPropsType) => {
  const [taskTitle, setTaskTitle] = useState("");

  const addTaskHandler = () => {
    addTask(taskTitle);
    setTaskTitle("");
  };

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value);
  };

  const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
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
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyUp={addTaskOnKeyUpHandler}
        />
        <Button title={"+"} onClickHandler={addTaskHandler} />
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const removeTaskHandler = () => {
              removeTask(task.id);
            };

            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <Button title={"x"} onClickHandler={removeTaskHandler} />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button
          title={"All"}
          onClickHandler={() => changeFilterTasksHandler("all")}
        />
        <Button
          title={"Active"}
          onClickHandler={() => changeFilterTasksHandler("active")}
        />
        <Button
          title={"Completed"}
          onClickHandler={() => changeFilterTasksHandler("completed")}
        />
      </div>
    </div>
  );
};

export default TodoList;
