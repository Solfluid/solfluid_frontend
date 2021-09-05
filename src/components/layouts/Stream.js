import React, { useEffect, useState } from "react";
import { Switch, Row, Col, Button, Skeleton } from "antd";

import TableContent from "../ui/receiving/table-item-content";
import TableItem from "../ui/receiving/table-item";
import { useSelector, useDispatch } from "react-redux";
import { getAllStreams } from "../../actions";

const getStatus = (stream) => {
	if (!stream.is_active) {
		return "Completed";
	}
	if (stream.start_time > new Date().getTime() / 1000) {
		return "Starting soon";
	}
	if (stream.end_time < new Date().getTime() / 1000) {
		return "Completed";
	}
	return "Streaming";
};

const Stream = () => {
	const selector = useSelector((state) => state.streamData);
	const walletSelector = useSelector((state) => state.walletConfig);
	const [streamsList, setStreamsList] = useState([]);
	const [streamingOnly, setStreamingOnly] = useState(false);
	const [skeleton, setSkeleton] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		setSkeleton(true);
		dispatch(getAllStreams());
	}, [walletSelector]);

	useEffect(() => {
		setSkeleton(false);
		setStreamsList(selector.receiving);
		if (streamingOnly) {
			const s = streamsList.filter((stream) => {
				if (
					stream.is_active &&
					stream.start_time < new Date().getTime() / 1000 &&
					stream.end_time > new Date().getTime() / 1000
				)
					return stream;
			});
			setStreamsList(s);
		}
	}, [selector, streamingOnly]);

	const cardCssProp = (idx) => {
		if (streamsList.length === 1) {
			return "card-custom-both";
		}
		if (idx === 0) return "card-custom";
		else if (idx === streamsList.length - 1) return "card-custom-bottom";
		return "card-custom-none";
	};

	const streams = streamsList.map((stream, idx) => {
		return (
			<TableItem
				status={getStatus(stream)}
				earned={stream.yeildEarned}
				token="SOL"
				receiver={stream.to}
				amount={stream.total_amount}
				cardCss={cardCssProp(idx)}
				key={stream.id}
				sender={stream.from}
			>
				<TableContent
					startTime={new Date(stream.start_time * 1000).toUTCString()}
					endTime={new Date(stream.end_time * 1000).toUTCString()}
					withdrawn={stream.lamports_withdrawn}
					receiver={stream.to}
					streamID={stream.id}
					amount={stream.total_amount}
					rate={stream.amount_second}
					sender={stream.from}
					sTime={stream.start_time}
					eTime={stream.end_time}
				/>
			</TableItem>
		);
	});

	return (
		<div style={{ height: "100%" }}>
			<Col className="site-page-header">
				<h3 className="page-heading">
					Receiving
					<br />
					<div className="page-sub-heading">
						Check Incoming streams, status, payroll.
					</div>
				</h3>
			</Col>
			<div
				className="stream-view-body"
				style={{
					padding: 25,
					height: "100%",
				}}
			>
				{skeleton ? (
					<Skeleton active />
				) : (
					<>
						<Row
							justify="space-between"
							style={{ margin: "0 20px", padding: "20px" }}
						>
							<div className="extra-text-view">
								<Switch
									onChange={(e) => {
										setStreamingOnly(e);
									}}
								/>{" "}
								Streaming Only
							</div>
							<Button
								className="refresh-btn-view"
								type="text"
								style={{
									borderRadius: "10px",
								}}
								onClick={() => {
									dispatch(getAllStreams());
									setSkeleton(true);
								}}
							>
								Refresh
							</Button>
						</Row>

						{streamsList.length === 0 ? (
							!walletSelector.wallet.connected ? (
								<Row
									justify="space-around"
									align="middle"
									style={{ height: "70%" }}
								>
									Connect wallet to view incoming streams!
								</Row>
							) : (
								<Row
									justify="space-around"
									align="middle"
									style={{ height: "70%" }}
								>
									No, streams yet!
								</Row>
							)
						) : (
							streams
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Stream;
