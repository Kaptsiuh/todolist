import { ChangeEvent } from "react";
import { FilterValuesType, TaskType } from "../App";
import { Button } from "./Button";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

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
  updateTask: (todolistId: string, taskId: string, title: string) => void;
  updateTodolist: (todolistId: string, title: string) => void;
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
  updateTask,
  updateTodolist,
}: TodoListPropsType) => {
  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    changeFilter(filter, todolistId);
  };

  const removeTodolistHandler = () => {
    removeTodolist(todolistId);
  };

  const addTaskHandler = (title: string) => {
    addTask(title, todolistId);
  };

  const updateTodolistHandler = (newTitle: string) => {
    updateTodolist(todolistId, newTitle);
  };

  const updateTaskHandler = (taskId: string, newTitle: string) => {
    updateTask(todolistId, taskId, newTitle);
  };

  const changeTaskStatusHandler = (
    taskId: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newStatusValue = e.currentTarget.checked;
    changeTaskStatus(taskId, newStatusValue, todolistId);
  };

  const removeTaskHandler = (taskId: string) => {
    removeTask(taskId, todolistId);
  };

  return (
    <div>
      <h3>
        <EditableSpan oldTitle={title} updateItem={updateTodolistHandler} />
      </h3>
      <Button title={"x"} onClickHandler={removeTodolistHandler} />
      <AddItemForm addItem={addTaskHandler} />
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            return (
              <li key={task.taskId} className={task.isDone ? "is-done" : ""}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={(e) => changeTaskStatusHandler(task.taskId, e)}
                />
                <EditableSpan
                  oldTitle={task.title}
                  updateItem={(newTitle) =>
                    updateTaskHandler(task.taskId, newTitle)
                  }
                />
                <Button
                  title={"x"}
                  onClickHandler={() => removeTaskHandler(task.taskId)}
                />
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
