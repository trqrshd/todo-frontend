import React from "react";
import { Button, Card, Input, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import { createTodoRequest, setFormVisible } from "./slice";

const { TextArea } = Input;

function TodoForm() {
  const dispatch = useDispatch();
  const createLoading = useSelector((state) => state.todo.form.loading);

  return (
    <div>
      <Form
        name="basic"
        onFinish={(values) => {
          dispatch(createTodoRequest(values));
        }}
      >
        <Card
          style={{ position: "relative" }}
          className="form-card"
          title={
            <Form.Item
              name="title"
              style={{ margin: 0, padding: 0 }}
              rules={[{ required: true, message: "Please write todo title!" }]}
            >
              <Input placeholder="Todo title" size="small" />
            </Form.Item>
          }
        >
          <Form.Item
            name="description"
            style={{ margin: 0, padding: 0 }}
            rules={[
              { required: true, message: "Please write todo description!" },
            ]}
          >
            <TextArea style={{ resize: "none" }} rows={2} />
          </Form.Item>

          <div
            style={{
              float: "right",
              position: "absolute",
              bottom: 20,
              right: 20,
            }}
          >
            <Button
              onClick={() => dispatch(setFormVisible(false))}
              type="default"
              size="small"
              style={{ marginRight: 5 }}
            >
              <CloseOutlined /> Cancel
            </Button>
            <Button
              loading={createLoading}
              htmlType="submit"
              type="primary"
              size="small"
            >
              <CheckOutlined /> Create
            </Button>
          </div>
        </Card>
      </Form>
    </div>
  );
}

export default TodoForm;
