import { createSlice } from "@reduxjs/toolkit";

// no need to manage immuteability
// redux-toolkit handles it by default
const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: { data: [], loading: false },
    form: { loading: false, visible: false },
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
    setFormVisible: (state, { payload }) => {
      state.form.visible = payload;
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
  setFormVisible,
} = todoSlice.actions;

export default todoSlice;
