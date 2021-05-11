import { Col } from "antd";

const CardCol = ({ children }) => (
  <Col xxl={4} xl={6} lg={6} md={12} sm={24} xs={24}>
    {children}
  </Col>
);

export default CardCol;
