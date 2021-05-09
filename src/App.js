import React, { useEffect } from "react";
import { Button, Card, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { EditFilled } from "@ant-design/icons";

import { sagaActions } from "./sagaActions";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_DATA_SAGA });
  }, [dispatch]);

  return (
    <div>
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
              {todo.description}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default App;
