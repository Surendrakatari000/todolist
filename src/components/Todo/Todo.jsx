import { FaRegCircle } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  updateIsCompledtedTodo,
  deleteTodo,
  updatigTodo,
  setFocusTodo,
  blurTodo,
} from "../../store/slices/todo";
import { FaRegCheckCircle } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import "./Todo.css";

const Todo = ({ singleTodo }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [renmaeTodoVal, setRenameTodoVal] = useState(singleTodo.name);
  const updateTodoFun = (e) => {
    if (e.key === "Enter") {
      dispatch(updatigTodo({ id: singleTodo.id, updatedName: renmaeTodoVal }));
    }
  };
  useEffect(() => {
    if (singleTodo.isInFocus) {
      inputRef.current.focus();
    }
  }, [singleTodo.isInFocus]);
  console.log(singleTodo);
  const theme = useSelector((state) => state.Todo.theme);
  const selectedCategory = useSelector(
    (state) => state.Todo.todoCategory.selectedCategory
  );
  return (
    <>
      <div
        className={`w-[100%] flex flex-row ${
          singleTodo.isInFocus && "mb-[10px] mt-[10px]"
        }`}
      >
        {singleTodo.isCompleted ? (
          <FaRegCheckCircle
            size={20}
            color={theme ? "black" : "white"}
            className="mt-[10px] mr-[15px]"
            onClick={() => dispatch(updateIsCompledtedTodo(singleTodo.id))}
          />
        ) : (
          <FaRegCircle
            size={20}
            color={theme ? "black" : "white"}
            className="mt-[10px] mr-[15px]"
            onClick={() => dispatch(updateIsCompledtedTodo(singleTodo.id))}
          />
        )}
        {singleTodo.isInFocus ? (
          <input
            ref={inputRef}
            value={renmaeTodoVal}
            className={`${
              theme ? "text-black" : "text-white"
            } text-3xl w-[80%] break-words whitespace-normal inline-block  outline-none`}
            onChange={(e) => setRenameTodoVal(e.target.value)}
            onKeyDown={updateTodoFun}
            onBlur={() => {
              dispatch(blurTodo(singleTodo.id));
              setRenameTodoVal(singleTodo.name)
             }}
          />
        ) : (
          <span
            onClick={() => {
              if (!singleTodo.isCompleted) {
                dispatch(setFocusTodo(singleTodo.id));
              }
            }}
            className={`${
              theme ? "text-gray-900" : "text-gray-100"
            } text-2xl  w-[80%] break-words whitespace-normal inline-block ${
              singleTodo.isCompleted && selectedCategory !== "Completed" && "line-through"
            }`}
          >
            {singleTodo.name}
          </span>
        )}

        <MdDeleteOutline
          size={35}
          color={theme ? "black" : "white"}
          className="ml-auto mt-[5px]"
          onClick={() => dispatch(deleteTodo(singleTodo.id))}
        />
      </div>
      <hr className="text-gray-500" />
    </>
  );
};

export default Todo;
