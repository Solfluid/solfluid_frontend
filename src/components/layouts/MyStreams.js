import React from 'react';
import { Col } from 'antd';
import TableItem from '../ui/streaming/table-item';
import TableContent from '../ui/streaming/table-item-content';

const MyStreams = () => {
    return (
        <div style={{height:"100%"}}>
          <Col className="site-page-header">
                  <h3 className="page-heading">Stream History<br/><div className="page-sub-heading">Check progress of your streams here.</div></h3>
          </Col>
          <div style={{backgroundColor:"#faf9fa", padding:25, height:"100%"}}>
              <TableItem
                status="Streaming"
                earned="10"
                token="SOL"
                amount="1000"
                cardCss="card-custom"
              >
                  <TableContent
                    startTime={new Date().toUTCString()}
                    endTime={new Date().toUTCString()}
                    withdrawn="20.0"
                    receiver="1n2j4bkjbakjdvbakjdbavkj"
                    streamed="50.0"
                    statusID={1}
                  />
              </TableItem>
              <TableItem
                status="Streaming"
                earned="10"
                token="SOL"
                amount="1000"
                cardCss="card-custom-none"
              >
                  <TableContent
                    startTime={new Date().toUTCString()}
                    endTime={new Date().toUTCString()}
                    withdrawn="20.0"
                    receiver="1n2j4bkjbakjdvbakjdbavkj"
                    streamed="50.0"
                    statusID={1}
                  />
              </TableItem>
              <TableItem
                status="Streaming"
                earned="10"
                token="SOL"
                amount="1000"
                cardCss="card-custom-none"
              >
                  <TableContent
                    startTime={new Date().toUTCString()}
                    endTime={new Date().toUTCString()}
                    withdrawn="20.0"
                    receiver="1n2j4bkjbakjdvbakjdbavkj"
                    streamed="50.0"
                    statusID={1}
                  />
              </TableItem>
              <TableItem
                status="Streaming"
                earned="10"
                token="SOL"
                amount="1000"
                cardCss="card-custom-none"
              >
                  <TableContent
                    startTime={new Date().toUTCString()}
                    endTime={new Date().toUTCString()}
                    withdrawn="20.0"
                    receiver="1n2j4bkjbakjdvbakjdbavkj"
                    streamed="50.0"
                    statusID={1}
                  />
              </TableItem>
              <TableItem
                status="Streaming"
                earned="10"
                token="SOL"
                amount="1000"
                cardCss="card-custom-none"
              >
                  <TableContent
                    startTime={new Date().toUTCString()}
                    endTime={new Date().toUTCString()}
                    withdrawn="20.0"
                    receiver="1n2j4bkjbakjdvbakjdbavkj"
                    streamed="50.0"
                    statusID={1}
                  />
              </TableItem>
              <TableItem
                status="Streaming"
                earned="10"
                token="SOL"
                amount="1000"
                cardCss="card-custom-none"
              >
                  <TableContent
                    startTime={new Date().toUTCString()}
                    endTime={new Date().toUTCString()}
                    withdrawn="20.0"
                    receiver="1n2j4bkjbakjdvbakjdbavkj"
                    streamed="50.0"
                    statusID={1}
                  />
              </TableItem>
              <TableItem
                status="Streaming"
                earned="10"
                token="SOL"
                amount="1000"
                cardCss="card-custom-bottom"
              >
                  <TableContent
                    startTime={new Date().toUTCString()}
                    endTime={new Date().toUTCString()}
                    withdrawn="20.0"
                    receiver="1n2j4bkjbakjdvbakjdbavkj"
                    streamed="50.0"
                    statusID={1}
                  />
              </TableItem>
          </div>
        </div>
    )
}

export default MyStreams;