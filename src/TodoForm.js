import React, { useEffect } from "react";
import { Button, Card, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import { setFormValue } from "./app/store";

const { TextArea } = Input;

function TodoForm() {
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.todo.form);

  return (
    <div>
      <Card
        title={
          <Input
            onChange={({ target: { value } }) =>
              dispatch({ type: setFormValue, payload: { key: "title", value } })
            }
            placeholder="Todo title"
            size="small"
            value={formState.title}
          />
        }
      >
        <TextArea
          rows={2}
          value={formState.description}
          onChange={({ target: { value } }) =>
            dispatch({
              type: setFormValue,
              payload: { key: "description", value },
            })
          }
        />

        <div style={{ marginTop: 20, float: "right" }}>
          <Button type="default" size="small" style={{ marginRight: 5 }}>
            <CloseOutlined /> Cancel
          </Button>
          <Button
            type="primary"
            size="small"
            // onClick={dispatch({ type: sagaActions.FETCH_DATA_SAGA })}
          >
            <CheckOutlined /> Save
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default TodoForm;
