import { ChangeEvent } from "react";
import { FilterValuesType, TaskType } from "../App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import { filterButtonsContainerSx, getListItemSx } from "./Todolist.styles";

type TodoListPropsType = {
  title: string;
  todolistId: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (filter: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void;
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

  const changeTaskStatusHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked;
    changeTaskStatus(taskId, newStatusValue, todolistId);
  };

  const removeTaskHandler = (taskId: string) => {
    removeTask(taskId, todolistId);
  };

  return (
    <div>
      <Box sx={filterButtonsContainerSx}>
        <h3>
          <EditableSpan oldTitle={title} updateItem={updateTodolistHandler} />
        </h3>
        <IconButton aria-label="delete" onClick={removeTodolistHandler}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <AddItemForm addItem={addTaskHandler} />
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasks.map((task) => {
            return (
              <ListItem key={task.taskId} sx={getListItemSx(task.isDone)}>
                <div>
                  <Checkbox
                    checked={task.isDone}
                    onChange={(e) => changeTaskStatusHandler(task.taskId, e)}
                  />
                  <EditableSpan
                    oldTitle={task.title}
                    updateItem={(newTitle) => updateTaskHandler(task.taskId, newTitle)}
                  />
                </div>
                <IconButton aria-label="delete" onClick={() => removeTaskHandler(task.taskId)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
      )}
      <Box sx={filterButtonsContainerSx}>
        <Button
          variant={filter === "all" ? "outlined" : "contained"}
          color="error"
          onClick={() => changeFilterTasksHandler("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "outlined" : "contained"}
          color="warning"
          onClick={() => changeFilterTasksHandler("active")}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "outlined" : "contained"}
          color={"success"}
          onClick={() => changeFilterTasksHandler("completed")}
        >
          Completed
        </Button>
      </Box>
    </div>
  );
};
