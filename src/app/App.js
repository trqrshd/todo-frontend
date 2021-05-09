import dayjs from "dayjs";
import React, { useEffect } from "react";
import { Button, Card, Row, Col, Tooltip, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { EditFilled, PlusOutlined } from "@ant-design/icons";

import { fetchTodoListRequest } from "./containers/todo/slice";
import TodoForm from "./containers/todo/TodoForm";

import "./App.css";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
dayjs().format();

const { Meta } = Card;

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todoList);

  useEffect(() => {
    dispatch(fetchTodoListRequest());
  }, [dispatch]);

  return (
    <div style={{ margin: 50 }}>
      <Row gutter={20}>
        {todos.data.map((todo) => (
          <Col span={6} key={todo.id}>
            <Card
              title={todo.title}
              extra={
                <Button type="primary" size="small" icon={<EditFilled />}>
                  Edit
                </Button>
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
                  description={`${dayjs(todo.updated_at).fromNow()} is edited.`}
                />
              </div>
            </Card>
          </Col>
        ))}
        <Col span={6}>
          <Card style={{ textAlign: "center" }} className="cursor-pointer">
            <Tooltip title="Create Todo">
              <div
                style={{ border: `1px dashed grey`, padding: 25, margin: 25 }}
              >
                <PlusOutlined
                  style={{
                    fontSize: 100,
                    color: "grey",
                  }}
                />
              </div>
            </Tooltip>
          </Card>
        </Col>
        <Col span={6}>
          <TodoForm />
        </Col>
      </Row>
    </div>
  );
}

export default App;
