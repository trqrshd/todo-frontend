import { Card, Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

import CardCol from "./CardCol";
import { setFormVisible } from "./slice";

export default function AddTodoButtonCard() {
  const dispatch = useDispatch();

  return (
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
  );
}
