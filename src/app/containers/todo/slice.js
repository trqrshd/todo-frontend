import { createSlice } from "@reduxjs/toolkit";

// no need to manage immuteability
// redux-toolkit handles it by default
const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: { data: [], loading: false },
    form: { data: { title: "", description: "" }, loading: false },
  },
  reducers: {
    fetchTodoListRequest: (state) => {
      state.todoList.loading = true;
    },
    fetchTodoListSuccess: (state, action) => {
      state.todoList.data = action.payload;
    },
    fetchTodoListError: (state) => {
      state.todoList.loading = false;
    },
    createTodoRequest: (state) => {
      state.form.loading = true;
    },
    createTodoSuccess: (state) => {
      state.form.loading = false;
    },
    createTodoError: (state) => {
      state.form.loading = false;
    },
    setFormValue: (state, action) => {
      state.form.data[action.payload.key] = action.payload.value;
    },
  },
});

export const {
  fetchTodoListRequest,
  fetchTodoListSuccess,
  fetchTodoListError,
  createTodoRequest,
  createTodoSuccess,
  createTodoError,
  setFormValue,
} = todoSlice.actions;

export default todoSlice;
