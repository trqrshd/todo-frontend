import { Row, Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TodoForm from "./components/TodoForm";
import TodoViewCard from "./components/TodoViewCard";
import AddTodoButtonCard from "./components/AddTodoButtonCard";

import {
  setEditMode,
  setFormVisible,
  createTodoRequest,
  updateTodoRequest,
  fetchTodoListRequest,
} from "./components/slice";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todoList);
  const { visible: isCreateFormVisible, loading: createLoading } = useSelector(
    (state) => state.todo.form
  );

  useEffect(() => {
    dispatch(fetchTodoListRequest());
  }, [dispatch]);

  return (
    <Spin spinning={todos.loading} tip="Loading...">
      <div style={{ margin: 20 }}>
        <Row gutter={20}>
          {/* Render add button or create form */}
          {!isCreateFormVisible ? (
            <AddTodoButtonCard />
          ) : (
            <TodoForm
              submitting={createLoading}
              onSubmit={(values) => dispatch(createTodoRequest(values))}
              onCancel={() => dispatch(setFormVisible(false))}
            />
          )}

          {/* Render List */}
          {todos.data.map((todo, index) =>
            todo.editing ? (
              <TodoForm
                key={todo.id}
                id={todo.id}
                initialValues={todo}
                submitting={todo.editLoading}
                onSubmit={(values) =>
                  dispatch(updateTodoRequest({ ...todo, ...values }))
                }
                onCancel={() =>
                  dispatch(setEditMode({ id: todo.id, editing: false }))
                }
              />
            ) : (
              <TodoViewCard todo={todo} index={index} />
            )
          )}
        </Row>
      </div>
    </Spin>
  );
}

export default App;
