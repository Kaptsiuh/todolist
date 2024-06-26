import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

export type RemoveTodolistAActionType = {
  type: "REMOVE-TODOLIST";
  payload: {
    id: string;
  };
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  payload: {
    title: string;
  };
};

export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  payload: {
    id: string;
    title: string;
  };
};

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  payload: {
    id: string;
    filter: FilterValuesType;
  };
};

type ActionsType =
  | RemoveTodolistAActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

let todolistID1 = v1();
let todolistID2 = v1();

const initialState: TodolistType[] = [
  {
    todolistId: todolistID1,
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
    todolistId: todolistID2,
    title: "What to buy",
    filter: "all",
    tasks: [
      { taskId: v1(), title: "Typescript", isDone: false },
      { taskId: v1(), title: "RTK query", isDone: false },
    ],
  },
];

export const todolistsReducer = (
  state: TodolistType[] = initialState,
  action: ActionsType
): TodolistType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.todolistId !== action.payload.id);
    }
    case "ADD-TODOLIST": {
      const newTodolistId = v1();
      const newTodolist: TodolistType = {
        todolistId: newTodolistId,
        title: action.payload.title,
        filter: "all",
        tasks: [],
      };
      return [...state, newTodolist];
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map((tl) =>
        tl.todolistId === action.payload.id ? { ...tl, title: action.payload.title } : tl
      );
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map((tl) =>
        tl.todolistId === action.payload.id ? { ...tl, filter: action.payload.filter } : tl
      );
    }
    default:
      return state;
  }
};

export const removeTodolistAC = (todolistId: string) => {
  return {
    type: "REMOVE-TODOLIST",
    payload: {
      id: todolistId,
    },
  } as const;
};

export const addTodolistAC = () => {
  return {
    type: "ADD-TODOLIST",
    payload: {
      title: "New Todolist",
    },
  } as const;
};

export const updateTodolistAC = (todolistId: string) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
      id: todolistId,
      title: "What to buy",
    },
  } as const;
};

export const changeFilterAC = (todolistId: string) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
      id: todolistId,
      filter: "completed",
    },
  } as const;
};
