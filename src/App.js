import dayjs from "dayjs";
import React, { useEffect } from "react";
import { Button, Card, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { EditFilled, PlusOutlined } from "@ant-design/icons";

import { sagaActions } from "./sagaActions";

import "./App.css";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
dayjs().format();

const { Meta } = Card;

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_DATA_SAGA });
  }, [dispatch]);

  return (
    <div style={{ margin: 50 }}>
      <Row gutter={20}>
        {todos.map((todo) => (
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

              <Meta
                style={{ textAlign: "center" }}
                description={dayjs(todo.created_at).fromNow()}
              />
            </Card>
          </Col>
        ))}
        <Col span={6}>
          <Card style={{ textAlign: "center" }}>
            <PlusOutlined
              style={{
                fontSize: 70,
                marginBottom: 47,
                marginTop: 20,
                color: "grey",
              }}
            />

            <Meta description="Create Todo" />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default App;
