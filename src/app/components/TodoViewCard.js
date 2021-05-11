import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { Button, Card, Divider, Popconfirm } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";

import CardCol from "./CardCol";
import { deleteTodoRequest, setEditMode } from "./slice";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
dayjs().format();

const { Meta } = Card;

export default function TodoViewCard({ index, todo }) {
  const dispatch = useDispatch();

  return (
    <CardCol>
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
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={() => dispatch(deleteTodoRequest(todo))}
              okText="Yes"
              cancelText="No"
            >
              <Button loading={todo.deleting} type="danger" size="small">
                <DeleteFilled />
              </Button>
            </Popconfirm>
          </>
        }
      >
        <div className="todo-description">{todo.description}</div>

        <Divider style={{ margin: 0 }} />

        <div>
          <Meta
            style={{ marginTop: 20 }}
            description={`${dayjs(todo.created_at).fromNow()} is created.`}
          />
          <Meta
            style={{ marginTop: 10 }}
            description={`${dayjs(todo.updated_at).fromNow()} is edited.`}
          />
        </div>
      </Card>
    </CardCol>
  );
}
