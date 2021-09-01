import React, { useState } from "react";
import { Row } from "antd";
import { DownOutlined, PropertySafetyFilled } from "@ant-design/icons";
const Tableitem = (props) => {
  const [openBox, setOpenBox] = useState(false);

  return (
    <div>
      <Row id={props.streamid} justify="space-between">
        <div>{props.streamid}</div>
        <div>{props.to}</div>
        <div>{props.amount}</div>
        <div>{props.yield}</div>
        <DownOutlined
          onClick={() => {
            setOpenBox(!openBox);
          }}
        />
        <div></div>
      </Row>
      {openBox ? (
        <div>
          {" "}
          <div>{props.withdraw}</div>
          <div>{props.starttime}</div>
          <div>{props.starttime}</div>{" "}
        </div>
      ) : null}
    </div>
  );
};

export default Tableitem;
