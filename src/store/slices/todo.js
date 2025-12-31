import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const TodoSlice = createSlice({
  name: "Todo",
  initialState: {
    theme: true,
    todoCategory: {
      categories: [
        "All",
        "General",
        "Work",
        "Shopping",
        "Personal",
        "Bussiness",
        "Health",
        "Study",
        "Projects",
        "Completed",
      ],
      selectedCategory: "General",
    },

    todo: [
      {
        id: uuidv4(),
        name: "Read daily news",
        isCompleted: false,
        isInFocus: false,
        category: "General",
      },
      {
        id: uuidv4(),
        name: "Clean workspace",
        isCompleted: false,
        isInFocus: false,
        category: "General",
      },
      {
        id: uuidv4(),
        name: "Complete office report",
        isCompleted: false,
        isInFocus: false,
        category: "Work",
      },
      {
        id: uuidv4(),
        name: "Attend team meeting",
        isCompleted: false,
        isInFocus: false,
        category: "Work",
      },

      {
        id: uuidv4(),
        name: "Buy groceries",
        isCompleted: false,
        isInFocus: false,
        category: "Shopping",
      },
      {
        id: uuidv4(),
        name: "Order phone charger",
        isCompleted: false,
        isInFocus: false,
        category: "Shopping",
      },

      {
        id: uuidv4(),
        name: "Call a friend",
        isCompleted: false,
        isInFocus: false,
        category: "Personal",
      },
      {
        id: uuidv4(),
        name: "Read a book",
        isCompleted: false,
        isInFocus: false,
        category: "Personal",
      },

      {
        id: uuidv4(),
        name: "Review business ideas",
        isCompleted: false,
        isInFocus: false,
        category: "Bussiness",
      },
      {
        id: uuidv4(),
        name: "Check monthly expenses",
        isCompleted: false,
        isInFocus: false,
        category: "Bussiness",
      },

      {
        id: uuidv4(),
        name: "Morning workout",
        isCompleted: false,
        isInFocus: false,
        category: "Health",
      },
      {
        id: uuidv4(),
        name: "Drink 3L water",
        isCompleted: false,
        isInFocus: false,
        category: "Health",
      },

      {
        id: uuidv4(),
        name: "Revise React concepts",
        isCompleted: false,
        isInFocus: false,
        category: "Study",
      },
      {
        id: uuidv4(),
        name: "Practice JavaScript problems",
        isCompleted: false,
        isInFocus: false,
        category: "Study",
      },

      {
        id: uuidv4(),
        name: "Work on Todo App UI",
        isCompleted: false,
        isInFocus: false,
        category: "Projects",
      },
      {
        id: uuidv4(),
        name: "Fix Redux bugs",
        isCompleted: false,
        isInFocus: false,
        category: "Projects",
      },
    ],

    input: {
      status: true,
      value: "",
    },
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = !state.theme;
    },
    updateSelectedCategory: (state, action) => {
      state.todoCategory.selectedCategory = action.payload;
    },
    addTodo: (state, action) => {
      let categoryByAdding = "General";
      if (
        state.todoCategory.selectedCategory !== "All" &&
        state.todoCategory.selectedCategory !== "General"
      ) {
        categoryByAdding = state.todoCategory.selectedCategory;
      }
      state.todo.push({
        id: uuidv4(),
        name: action.payload,
        isCompleted: false,
        isInFocus: false,
        category: categoryByAdding,
      });
    },
    updateIsCompledtedTodo: (state, action) => {
      state.todo = state.todo.map((ele) =>
        ele.id === action.payload
          ? { ...ele, isCompleted: !ele.isCompleted }
          : ele
      );
    },
    updatigTodo: (state, action) => {
      const { id, updatedName } = action.payload;
      state.todo = state.todo.map((ele) =>
        ele.id === id
          ? { ...ele, name: updatedName, isInFocus: !ele.isInFocus }
          : ele
      );
    },
    setFocusTodo: (state, action) => {
      state.todo = state.todo.map((ele) =>
        ele.id === action.payload
          ? { ...ele, isInFocus: true }
          : { ...ele, isInFocus: false }
      );
    },
    blurTodo: (state, action) => {
      state.todo = state.todo.map((ele) =>
        ele.id === action.payload ? { ...ele, isInFocus: false } : ele
      );
    },
    deleteTodo: (state, action) => {
      state.todo = state.todo.filter((ele) => ele.id !== action.payload);
    },
    takingInput: (state, action) => {
      state.input.value = action.payload;
    },
    toggleInputStatus: (state) => {
      state.input.status = !state.input.status;
    },
  },
});

export const {
  toggleTheme,
  addTodo,
  takingInput,
  toggleInputStatus,
  updateIsCompledtedTodo,
  deleteTodo,
  updatigTodo,
  setFocusTodo,
  blurTodo,
  updateSelectedCategory,
} = TodoSlice.actions;
export default TodoSlice.reducer;
