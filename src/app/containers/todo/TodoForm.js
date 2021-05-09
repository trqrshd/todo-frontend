import React from "react";
import { Button, Card, Input, Form } from "antd";

import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function TodoForm({ onSubmit, onCancel, submitting, id }) {
  return (
    <div>
      <Form
        name="basic"
        onFinish={(values) => {
          onSubmit(values);
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
              disabled={submitting}
              onClick={onCancel}
              type="default"
              size="small"
              style={{ marginRight: 5 }}
            >
              <CloseOutlined /> Cancel
            </Button>
            <Button
              loading={submitting}
              htmlType="submit"
              type="primary"
              size="small"
            >
              <CheckOutlined /> {id ? "Save" : "Create"}
            </Button>
          </div>
        </Card>
      </Form>
    </div>
  );
}

export default TodoForm;
