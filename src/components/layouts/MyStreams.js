import React, { useEffect, useState } from "react";
import { Button, Col, Row, Switch } from "antd";
import TableItem from "../ui/streaming/table-item";
import TableContent from "../ui/streaming/table-item-content";
import { useSelector, useDispatch } from "react-redux";
import { connectWallet, getAllStreams } from "../../actions";

const MyStreams = () => {
  const selector = useSelector((state) => state.streamData);
  const walletSelector = useSelector((state) => state.walletConfig);
  const [streamsList, setStreamsList] = useState([]);
  const [streamingOnly, setStreamingOnly] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStreams());
  }, [walletSelector]);

  useEffect(() => {
    setStreamsList(selector.sending);
    if(streamingOnly){
      streamsList.filter((stream)=>{
        if((stream.is_active && stream.start_time<new Date().getTime()/1000 && stream.end_time>new Date().getTime()/1000)) return stream;
      })
    }
  }, [selector, streamingOnly]);

  const cardCssProp = (idx) => {
    if(streamsList.length===1){
      return "card-custom-both";
    }
    if(idx===0) return "card-custom";
    return "card-custom-bottom";
  }

  const streams = streamsList.map((stream, idx)=>{
      return (
        <TableItem
          status={stream.status}
          earned={stream.yeildEarned}
          token="SOL"
          receiver={stream.to}
          amount={stream.total_amount}
          cardCss={cardCssProp(idx)}
          key={stream.id}
        >
          <TableContent
            startTime={new Date(stream.start_time * 1000).toUTCString()}
            endTime={new Date(stream.end_time * 1000).toUTCString()}
            withdrawn={stream.lamports_withdrawn}
            receiver={stream.to}
            streamed={stream.status}
            earned={stream.yeildEarned}
            streamID={stream.id}
            statusID={stream.statusID}
          />
        </TableItem>
      );
    }
  );

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
     
      <div style={{ backgroundColor: "#faf9fa", padding: 25, height: "100%" }}>
        
        <Row justify="space-between" style={{margin:"0 20px", padding:"20px"}}>
            <div><Switch onChange={(e)=>{setStreamingOnly(e)}}/> Streaming Only</div>
            <Button type="text" style={{borderRadius:"10px", backgroundColor:"#188fff11"}} onClick={()=>dispatch(getAllStreams())}>Refresh</Button>
        </Row>

        {streamsList.length === 0 ? ((!walletSelector.wallet.connected)?
          <Row justify="space-around" align="middle" style={{height: "70%" }}>
            Connect wallet to view outgoing streams!
          </Row>:
          <Row justify="space-around" align="middle" style={{height: "70%" }}>
              Create a stream to get started!
          </Row>
        ) : 
          streams
        }
      </div>
    </div>
  );
};

export default MyStreams;
