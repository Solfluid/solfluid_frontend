import React from 'react';
import { Statistic, Row, Col } from 'antd';

import TableContent from '../ui/receiving/table-item-content';
import TableItem from '../ui/receiving/table-item';

const Stream = () => {

    return (
        <div>
            <Col className="site-page-header">
                  <h3 className="page-heading">Receiving<br/><div className="page-sub-heading">Check Incoming streams, status, payroll.</div></h3>
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
    );
}

export default Stream;