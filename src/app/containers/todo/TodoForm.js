import React, { useEffect } from "react";
import { Button, Card, Input, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import { setFormValue, createTodoRequest } from "./slice";

const { TextArea } = Input;

function TodoForm() {
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.todo.form.data);

  return (
    <div>
      <Form
        name="basic"
        onFinish={(values) => {
          dispatch(createTodoRequest(values));
        }}
        onFinishFailed={() => {}}
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
              <Input
                onChange={({ target: { value } }) =>
                  dispatch(setFormValue({ key: "title", value }))
                }
                placeholder="Todo title"
                size="small"
                value={formState.title}
              />
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
            <TextArea
              style={{ resize: "none" }}
              rows={2}
              value={formState.description}
              onChange={({ target: { value } }) =>
                dispatch(setFormValue({ key: "description", value }))
              }
            />
          </Form.Item>

          <div
            style={{
              float: "right",
              position: "absolute",
              bottom: 20,
              right: 20,
            }}
          >
            <Button type="default" size="small" style={{ marginRight: 5 }}>
              <CloseOutlined /> Cancel
            </Button>
            <Button htmlType="submit" type="primary" size="small">
              <CheckOutlined /> Save
            </Button>
          </div>
        </Card>
      </Form>
    </div>
  );
}

export default TodoForm;
