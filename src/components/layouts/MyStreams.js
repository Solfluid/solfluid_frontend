import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import TableItem from "../ui/table-item";
import TableContent from "../ui/table-item-content";
import { useSelector, useDispatch } from "react-redux";
import { getAllStreams } from "../../actions";

const MyStreams = () => {
  const selector = useSelector((state) => state.streamData);
  const [streamsList, setStreamsList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStreams());
  }, []);

  useEffect(() => {
    console.log(selector.sending);
    setStreamsList(selector.sending);
  }, [selector]);

  return (
    <div style={{ height: "100%" }}>
      <Col className="site-page-header">
        <h3 className="page-heading">
          Stream History
          <br />
          <div className="page-sub-heading">
            Check progress of your streams here.
          </div>
        </h3>
      </Col>

      <div style={{ backgroundColor: "white", padding: 25, height: "100%" }}>
        {streamsList.length == 0 ? (
          <Row>No, Streams!</Row>
        ) : (
          streamsList.map((stream) => {
            return (
              <TableItem
                status={stream.status}
                earned={stream.yeildEarned}
                token="SOL"
                receiver={stream.to}
                amount={stream.total_amount}
                cardCss="card-custom"
                key={stream.id}
              >
                <TableContent
                  startTime={new Date(stream.start_time * 1000).toUTCString()}
                  endTime={new Date(stream.end_time * 1000).toUTCString()}
                  withdrawn={stream.lamports_withdrawn}
                  receiver={stream.to}
                  streamed={stream.status}
                  streamid={stream.id}
                  statusID={stream.statusID}
                />
              </TableItem>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyStreams;
