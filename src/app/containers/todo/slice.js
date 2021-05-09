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
    //   fetch list actions
    fetchTodoListRequest: (state) => {
      state.todoList.loading = true;
    },
    fetchTodoListSuccess: (state, action) => {
      state.todoList.data = action.payload;
      state.todoList.loading = false;
    },
    fetchTodoListError: (state) => {
      state.todoList.loading = false;
    },

    // create actions
    createTodoRequest: (state) => {
      state.form.loading = true;
    },
    createTodoSuccess: (state, { payload }) => {
      state.form.loading = false;
      state.todoList.data.unshift(payload);
    },
    createTodoError: (state) => {
      state.form.loading = false;
    },

    // delete actions
    deleteTodoRequest: (state, { payload: { id } }) => {
      const index = state.todoList.data.findIndex((item) => item.id === id);
      state.todoList.data[index].deleting = true;
    },
    deleteTodoSuccess: (state, { payload: id }) => {
      const index = state.todoList.data.findIndex((item) => item.id === id);
      state.todoList.data.splice(index, 1);
    },
    deleteTodoError: (state, { payload: id }) => {
      const index = state.todoList.data.findIndex((item) => item.id === id);
      state.todoList.data[index].deleting = false;
    },

    // others
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
  deleteTodoRequest,
  deleteTodoError,
  deleteTodoSuccess,
} = todoSlice.actions;

export default todoSlice;
