import React, { useState } from "react";
import { Button, Card, Input, Form } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import CardCol from "./CardCol";

const { TextArea } = Input;

function TodoForm({ onSubmit, onCancel, submitting, id, initialValues }) {
  const [descLength, setDescLength] = useState(
    initialValues?.description?.length || 0
  );

  return (
    <CardCol>
      <Form
        initialValues={initialValues || {}}
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
              style={{ margin: 0, padding: 0, fontWeight: 500, fontSize: 16 }}
              rules={[
                {
                  required: true,
                  message: "Please write todo title!",
                },
                {
                  max: 20,
                  message: "Title is too long!",
                },
              ]}
            >
              <Input
                style={{ fontWeight: 500, fontSize: 16 }}
                placeholder="Todo title"
                size="small"
              />
            </Form.Item>
          }
        >
          <Form.Item
            name="description"
            style={{ margin: 0, padding: 0 }}
            rules={[
              { required: true, message: "Please write todo description!" },
              {
                max: 100,
                message: "Description is too long!",
              },
            ]}
          >
            <TextArea
              onChange={({ target: { value } }) =>
                setDescLength(value?.length || 0)
              }
              placeholder="Description"
              style={{ resize: "none" }}
              rows={2}
            />
          </Form.Item>
          <div
            style={{
              color: "rgba(0, 0, 0, 0.45)",
              marginTop: 5,
              marginLeft: 3,
            }}
          >
            {descLength} / 100
          </div>

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
    </CardCol>
  );
}

export default TodoForm;
