import dayjs from "dayjs";
import React, { useEffect } from "react";
import { Button, Card, Row, Col, Tooltip, Divider, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { EditFilled, PlusOutlined, DeleteFilled } from "@ant-design/icons";

import {
  fetchTodoListRequest,
  setFormVisible,
  deleteTodoRequest,
  createTodoRequest,
  setEditMode,
  updateTodoRequest,
} from "./containers/todo/slice";
import TodoForm from "./containers/todo/TodoForm";

import "./App.css";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
dayjs().format();

const { Meta } = Card;

const CardCol = ({ children }) => (
  <Col xxl={4} xl={6} lg={6} md={12} sm={24} xs={24}>
    {children}
  </Col>
);

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todoList);
  const { visible: isCreateFormVisible, loading: createLoading } = useSelector(
    (state) => state.todo.form
  );

  useEffect(() => {
    dispatch(fetchTodoListRequest());
  }, [dispatch]);

  if (todos.loading)
    return (
      <div style={{ margin: "0 50px 50px 0" }}>
        <Spin spinning />
      </div>
    );

  return (
    <div style={{ margin: 20 }}>
      <Row gutter={20}>
        {!isCreateFormVisible ? (
          <CardCol>
            <Card style={{ textAlign: "center" }} className="cursor-pointer">
              <Tooltip title="Create Todo">
                <div
                  onClick={() => dispatch(setFormVisible(true))}
                  style={{
                    border: `1px dashed #1890ff`,
                    padding: 25,
                    margin: 25,
                  }}
                >
                  <PlusOutlined
                    type="primary"
                    style={{
                      fontSize: 100,
                      color: "#1890ff",
                    }}
                  />
                </div>
              </Tooltip>
            </Card>
          </CardCol>
        ) : (
          <CardCol>
            <TodoForm
              submitting={createLoading}
              onSubmit={(values) => dispatch(createTodoRequest(values))}
              onCancel={() => dispatch(setFormVisible(false))}
            />
          </CardCol>
        )}
        {todos.data.map((todo, index) =>
          todo.editing ? (
            <CardCol key={todo.id}>
              <TodoForm
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
            </CardCol>
          ) : (
            <CardCol key={todo.id}>
              <Card
                id={index === 0 ? "newly-added-todo" : ""}
                className={index === 0 ? "newly-added-todo" : ""}
                title={todo.title}
                extra={
                  <>
                    <Button
                      disabled={todo.deleting}
                      type="primary"
                      size="small"
                      style={{ marginRight: 5 }}
                      onClick={() =>
                        dispatch(setEditMode({ id: todo.id, editing: true }))
                      }
                    >
                      <EditFilled />
                    </Button>
                    <Button
                      loading={todo.deleting}
                      type="danger"
                      size="small"
                      onClick={() => dispatch(deleteTodoRequest(todo))}
                    >
                      <DeleteFilled />
                    </Button>
                  </>
                }
              >
                <div className="todo-description">{todo.description}</div>

                <Divider style={{ margin: 0 }} />

                <div>
                  <Meta
                    style={{ marginTop: 20 }}
                    description={`${dayjs(
                      todo.created_at
                    ).fromNow()} is created.`}
                  />
                  <Meta
                    style={{ marginTop: 10 }}
                    description={`${dayjs(
                      todo.updated_at
                    ).fromNow()} is edited.`}
                  />
                </div>
              </Card>
            </CardCol>
          )
        )}
      </Row>
    </div>
  );
}

export default App;
