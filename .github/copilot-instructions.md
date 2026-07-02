# Copilot Instructions for Todo List Project

## Architecture Overview

This is a **React + Vite + Redux Toolkit** todo list application with persistence.

### Core Stack

- **React 19.2** with Vite for fast development
- **Redux Toolkit** for state management with auto-serialization
- **Tailwind CSS 4** for styling
- **React Icons** for UI elements
- **Local Storage** for persistence (not backend)

### State Management Pattern

State lives in Redux with automatic persistence via custom localStorage middleware:

- **Store config** ([store/store.js](store/store.js)): Redux state auto-saves on every change
- **Single slice** ([store/slices/todo.js](store/slices/todo.js)): All app logic in `Todo` reducer
- **Persistence** ([store/localstorage.js](store/localstorage.js)): Preload state from localStorage and subscribe to saves

### State Structure (Critical Reference)

```javascript
state.Todo = {
  theme: boolean,           // light/dark mode
  todoCategory: {
    categories: string[],   // predefined list: "All", "General", "Work", etc.
    selectedCategory: string
  },
  todo: [                   // array of todo items
    {
      id: uuid,
      name: string,
      isCompleted: boolean,
      isInFocus: boolean,   // true when user is editing (shows input field)
      category: string
    }
  ],
  input: {
    status: boolean,        // true = search active, false = searching
    value: string           // search query
  }
}
```

## Key Patterns & Conventions

### Data Flow

1. Components dispatch Redux actions to modify state
2. State changes auto-persist to localStorage
3. Components re-render via `useSelector` hooks
4. Category filtering in Home component (not in reducer)
5. Search filtering in Home component (not in reducer)

### Component Hierarchy

```
App → Home → {Navbar, CategoryCarousel, Todo[]}
```

- **Home** ([components/Home/Home.jsx](components/Home/Home.jsx)): Single entry point that applies filtering logic
  - Filters todos by selected category (client-side)
  - Filters todos by search input (client-side)
  - Renders conditional "All", "Completed" views
- **Navbar**: Theme toggle + search input
- **CategoryCarousel**: Category selection
- **Todo**: Individual todo item with edit/delete/complete actions

### Naming Conventions & Notes

- Typos preserved: `updatigTodo` (not "updating"), `renmaeTodoVal` (not "rename")
- Focus-based editing: Uses `isInFocus` to toggle edit mode, not separate edit state
- Input field double-meaning: `input.status` means "is searching" (confusing name but documented)
- Action names: Use dispatch syntax like `dispatch(addTodo("task name"))`

### Styling Approach

- **Tailwind CSS** for layout and responsive classes
- **CSS Modules** per component (`Todo.css`, `Home.css`, etc.)
- **Styled-components** available but not yet used
- Theme applied via conditional className: `theme ? "bg-white" : "bg-gray-700"`

## Critical Developer Workflows

### Development Server

```bash
npm run dev        # Start Vite dev server with HMR
npm run build      # Production build
npm run preview    # Preview prod build locally
```

### Linting & Code Quality

```bash
npm run lint       # Run ESLint on all files
```

- ESLint config: [eslint.config.js](eslint.config.js) (flat config format)
- No TypeScript currently (template uses `.jsx`)

## Key Integration Points

### Adding a Todo Feature

1. Add reducer action in [store/slices/todo.js](store/slices/todo.js)
2. Export action from `TodoSlice.actions`
3. Dispatch in component via `useDispatch()`
4. Select state in component via `useSelector()`
5. No manual save needed—persistence is automatic

### Editing a Todo

- Use `setFocusTodo` to enter edit mode (`isInFocus=true`)
- User types in input, presses Enter
- `updatigTodo` action saves name and exits focus
- Uses `useRef` for input focus management ([components/Todo/Todo.jsx](components/Todo/Todo.jsx))

### Category Filtering Logic (In Home Component)

Filtering is NOT in Redux—done in component based on selector state:

```jsx
if (selectedCategory !== "All" && selectedCategory !== "Completed") {
  todos = todos.filter((todo) => todo.category === selectedCategory);
} else if (selectedCategory === "Completed") {
  todos = todos.filter((todo) => todo.isCompleted);
}
```

## External Dependencies to Know

- **react-multi-carousel**: Used in CategoryCarousel for scrolling categories
- **uuid**: Generates `id` for each todo (using `uuidv4()`)
- **react-redux**: Hooks like `useDispatch`, `useSelector` to connect components to store
- **@reduxjs/toolkit**: `createSlice` to define reducers and actions

## Common Pitfalls

1. **State persistence**: Always modify state in reducers—localStorage save is automatic
2. **Filtering is async**: Category/search filters run in render, not async thunks
3. **Focus management**: Edit mode uses `isInFocus` + `useRef` combo, not separate edit state
4. **Typos in codebase**: Accept naming as-is (e.g., `updatigTodo`)
5. **Theme is boolean**: `true=light`, `false=dark` mode (inverse might be expected)
