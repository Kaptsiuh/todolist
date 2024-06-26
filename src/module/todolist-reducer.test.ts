import { v1 } from "uuid";
import { TodolistType } from "../App";
import {
  addTodolistAC,
  changeFilterAC,
  removeTodolistAC,
  todolistsReducer,
  updateTodolistAC,
} from "./todolist-reduceer";

test("correct todolist should be removed", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  // стартовое значение
  const startState: TodolistType[] = [
    {
      todolistId: todolistId1,
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
      todolistId: todolistId2,
      title: "What to buy",
      filter: "all",
      tasks: [
        { taskId: v1(), title: "Typescript", isDone: false },
        { taskId: v1(), title: "RTK query", isDone: false },
      ],
    },
  ];
  // Действие
  //   const action = {
  //     type: "REMOVE-TODOLIST",
  //     payload: {
  //       id: todolistId1,
  //     },
  //   } as const;

  const endState = todolistsReducer(startState, removeTodolistAC(todolistId2));

  expect(endState.length).toBe(1);
  expect(endState[0].todolistId).toBe(todolistId1);
});

test("correct todolist should be added", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  // стартовое значение
  const startState: TodolistType[] = [
    {
      todolistId: todolistId1,
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
      todolistId: todolistId2,
      title: "What to buy",
      filter: "all",
      tasks: [
        { taskId: v1(), title: "Typescript", isDone: false },
        { taskId: v1(), title: "RTK query", isDone: false },
      ],
    },
  ];

  const endState = todolistsReducer(startState, addTodolistAC());

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe("New Todolist");
});

test("correct todolist should change its name", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  // стартовое значение
  const startState: TodolistType[] = [
    {
      todolistId: todolistId1,
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
      todolistId: todolistId2,
      title: "What to buy",
      filter: "all",
      tasks: [
        { taskId: v1(), title: "Typescript", isDone: false },
        { taskId: v1(), title: "RTK query", isDone: false },
      ],
    },
  ];

  const endState = todolistsReducer(startState, updateTodolistAC(todolistId1));

  expect(endState[0].title).toBe("What to buy");
  expect(endState[1].title).toBe("What to buy");
});

test("correct todolist should should be changed", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  // стартовое значение
  const startState: TodolistType[] = [
    {
      todolistId: todolistId1,
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
      todolistId: todolistId2,
      title: "What to buy",
      filter: "all",
      tasks: [
        { taskId: v1(), title: "Typescript", isDone: false },
        { taskId: v1(), title: "RTK query", isDone: false },
      ],
    },
  ];

  const endState = todolistsReducer(startState, changeFilterAC(todolistId2));

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe("completed");
});
