import { useSelector } from "react-redux";
import Todo from "../Todo/Todo";
import Navbar from "../Navbar/Navbar";
import CategoryCarousel from "../categoriesCarosle/categoriesCarosel";
import "./Home.css";

const Home = () => {
  const theme = useSelector((state) => state.Todo.theme);
  let todos = useSelector((state) => state.Todo.todo);
  const selectedCategory = useSelector(
    (state) => state.Todo.todoCategory.selectedCategory
  );
  if (selectedCategory !== "All" && selectedCategory !== "Completed") {
    todos = todos.filter((todo) => todo.category === selectedCategory);
  }else if (selectedCategory === "Completed") {
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
        theme ? "bg-gray-100" : "bg-gray-900"
      } min-h-screen flex flex-row justify-center`}
    >
      <div
        className={`${
          theme ? "bg-white" : "bg-gray-700"
        } todo-con  pl-[5vw] pr-[5vw] pt-[2vh] flex flex-col gap-[30px]`}
      >
        <Navbar />
        <CategoryCarousel />
        {todos.map((singleTodo) => {
          return <Todo key={singleTodo.id} singleTodo={singleTodo} />;
        })}
      </div>
    </div>
  );
};

export default Home;
