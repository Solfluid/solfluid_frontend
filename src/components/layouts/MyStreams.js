import React, { useEffect, useState } from "react";
import { Button, Col, Row, Skeleton, Switch } from "antd";
import TableItem from "../ui/streaming/table-item";
import TableContent from "../ui/streaming/table-item-content";
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

const MyStreams = () => {
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
		setStreamsList(selector.sending);
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
	});

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
									Connect wallet to view outgoing streams!
								</Row>
							) : (
								<Row
									justify="space-around"
									align="middle"
									style={{ height: "70%" }}
								>
									Create a stream to get started!
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

export default MyStreams;
