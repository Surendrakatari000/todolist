import { useSelector } from "react-redux";
import React from "react";

import Todo from "../Todo/Todo";
import Navbar from "../Navbar/Navbar";
import CategoryCarousel from "../categoriesCarosle/categoriesCarosel";
import "./Home.css";
import * as Styles from "./Styles";

const Home = () => {
  const theme = useSelector((state) => state.Todo.theme);
  let todos = useSelector((state) => state.Todo.todo);
  const selectedCategory = useSelector(
    (state) => state.Todo.todoCategory.selectedCategory
  );
  if (selectedCategory !== "All" && selectedCategory !== "Completed") {
    todos = todos.filter((todo) => todo.category === selectedCategory);
  } else if (selectedCategory === "Completed") {
    todos = todos.filter((todo) => todo.isCompleted);
  }

  const inputStatus = useSelector((state) => state.Todo.input.status);
  const inputValue = useSelector((state) => state.Todo.input.value);
  if (!inputStatus) {
    todos = todos.filter((todoEle) =>
      todoEle.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  }
  console.log("theme :", theme);

  return (
    <div
      className={`${
        theme ? Styles.outerBgLightStyles : Styles.outerBgDarkStyles
      } ${Styles.outerBaseStyles}`}
    >
      <div
        className={`${
          theme ? Styles.innerBgLightStyles : Styles.innerBgDarkStyles
        } ${Styles.innerBaseStyles}`}
      >
        <Navbar />
        <CategoryCarousel />
        {todos.map((singleTodo) => {
          return (
            <React.Fragment key={singleTodo.id}>
              <Todo singleTodo={singleTodo} />
              <hr className="text-gray-500" />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
