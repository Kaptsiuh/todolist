import React from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { Accordion } from "./components/Accordion/Accordion";
import { Rating } from "./components/Rating/Rating";

function App() {
  return (
    <div className="App">
      <TodoList />
      <TodoList />

      <Rating value={1} />
      <Rating value={2} />
      <Accordion titleValue={"Menu"} />
      <Accordion titleValue={"Users"} />
      <Rating value={5} />
    </div>
  );
}

export default App;
