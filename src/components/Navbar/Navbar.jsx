// import { FaFilter } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  takingInput,
  toggleInputStatus,
  toggleTheme,
} from "../../store/slices/todo";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineWbSunny } from "react-icons/md";

const Navbar = () => {
  const dispatch = useDispatch();
  const toogleInputStatus = () => {
    dispatch(toggleInputStatus());
  };
  const inputChange = (event) => {
    dispatch(takingInput(event.target.value));
  };
  const inputValue = useSelector((state) => state.Todo.input.value);
  console.log(inputValue);

  const addTodoFun = (event) => {
    if (event.key === "Enter" && inputValue !== "") {
      dispatch(addTodo(inputValue));
      dispatch(takingInput(""));
    }
  };
  const theme = useSelector((state) => state.Todo.theme);

  const inputStatus = useSelector((state) => state.Todo.input.status);
  console.log(inputStatus);
  console.log("theme", theme);

  return (
    <div className="text-white flex h-[60px] gap-[20px] ">
      <input
        placeholder={inputStatus ? "  add task..." : "  search task ..."}
        className={` border-solid border-[1px]  ${
          theme
            ? "bg-gray-100 border-black text-black"
            : "bg-gray-800 border-gray-600 text-gray-100 "
        } w-[80%] text-2xl  rounded-2xl p-4`}
        value={inputValue}
        onChange={inputChange}
        onKeyDown={inputStatus ? addTodoFun : undefined}
        type="search"
      />
      {inputStatus ? (
        <FaSearch
          color={theme ? "black" : "white"}
          size={30}
          onClick={toogleInputStatus}
          className="mt-[12px]"
        />
      ) : (
        <FaPlus
          color={theme ? "black" : "white"}
          size={30}
          onClick={toogleInputStatus}
          className="mt-[12px]"
        />
      )}
      {/* <FaFilter size={25} /> */}
      {!theme ? (
        <MdOutlineDarkMode
          size={38}
          className="mt-[8px]"
          onClick={() => dispatch(toggleTheme())}
        />
      ) : (
        <MdOutlineWbSunny
          color="black"
          size={38}
          className="mt-[8px]"
          onClick={() => dispatch(toggleTheme())}
        />
      )}
    </div>
  );
};

export default Navbar;
