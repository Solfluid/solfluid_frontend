import React, { useEffect, useState } from "react";
import {
	Drawer,
	Progress,
	Button,
	Row,
	Col,
	Card,
	InputNumber,
	notification,
} from "antd";
import { useDispatch } from "react-redux";

import { withdraw } from "../../../actions";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";

const { Meta } = Card;

const openNotificationSuccess = () => {
	notification["success"]({
		message: "Withdraw Success",
		description: "Withdraw was successfully processed.",
	});
};

const openNotificationFail = () => {
	notification["warning"]({
		message: "Withdraw Unsuccessful",
		description:
			"Some error occurred. However it is possible the amount was processed. Kindly check your wallet.",
	});
};

const TableContent = ({
	startTime,
	endTime,
	withdrawn,
	sender,
	streamID,
	amount,
	rate,
	sTime,
	eTime,
}) => {
	const [streamedProgress, setStreamedProgress] = useState(0);
	const [streamedAmount, setStreamedAmount] = useState(0);
	const [withdrawnProgress, setWithdrawnProgress] = useState(
		parseFloat((withdrawn / amount) * 100).toFixed(2)
	);
	const [drawer, setDrawer] = useState(false);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [withdrawAmount, setWithdrawAmount] = useState(0);
	const selector = useSelector((state) => state.withdrawStatus);

	useEffect(() => {
		const interval = setInterval(() => {
			let timeNow = new Date().getTime();
			if (sTime * 1000 > timeNow) {
				setStreamedAmount(0);
				setStreamedProgress(0);
			} else if (eTime * 1000 < timeNow) {
				setStreamedAmount(
					`${amount - withdrawn} (${(
						(amount - withdrawn) *
						0.000000001
					).toFixed(10)} sol)`
				);
				setStreamedProgress(100);
			} else {
				if (timeNow > sTime * 1000) {
					let amount_temp =
						Math.floor(((timeNow - sTime * 1000) * rate) / 1000) -
						withdrawn;
					setStreamedAmount(
						`${amount_temp} (${(amount_temp * 0.000000001).toFixed(
							10
						)} sol)`
					);
					setStreamedProgress(
						parseFloat(
							(((timeNow - sTime * 1000) * rate) /
								1000 /
								amount) *
								100
						).toFixed(2)
					);
				}
			}
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		if (loading) {
			if (selector) {
				openNotificationSuccess();
			} else {
				openNotificationFail();
			}
		}
		setLoading(false);
		setDrawer(false);
	}, [selector]);

	return (
		<div className="site-drawer-render-in-current-wrapper">
			<div style={{ padding: 30, border: "rgb(0,0,0,0.09) solid 1px" }}>
				{!isMobile ? (
					<Row justify="space-between" align="middle">
						<Col span={15}>
							<Row gutter={[16, 16]}>
								<Col span={12}>
									<Meta
									className="stream-meta-view"
									
										className="card-custom-extra item-heading"
										title="Start Time"
										description={startTime}
									></Meta>
								</Col>
								<Col span={12}>
									<Meta
										
										className="card-custom-extra item-heading"
										title="End Time"
										description={endTime}
									></Meta>
								</Col>
								<Col span={12}>
									<Meta
										
										className="card-custom-extra item-heading"
										title="Withdrawn"
										description={withdrawn.toString()}
									></Meta>
								</Col>
								<Col span={12}>
									<Meta
										
										className="card-custom-extra item-heading"
										title="Sender"
										description={sender}
									></Meta>
								</Col>
							</Row>
						</Col>

						<Col span={8}>
							<Card
								
								className="card-custom-extra"
								title="Available to Claim"
							>
								<Row justify="space-between">
									<div className="card-earned-number">
										{streamedAmount}
									</div>
									<Button
										type="primary"
										shape="round"
										onClick={() => setDrawer(true)}
									>
										Withdraw
									</Button>
								</Row>
							</Card>
						</Col>
					</Row>
				) : <div></div>}
				<br />
				<br />
				<Row className="extra-text-view">Streamed</Row>
				<Progress
					strokeColor={{
						"0%": "#667DE5",
						"100%": "#1890ff",
					}}
					percent={streamedProgress}
				/>
				<Row className="extra-text-view">Withdrawn</Row>
				<Progress
					strokeColor={{
						"0%": "#667DE5",
						"100%": "#1890ff",
					}}
					percent={withdrawnProgress}
				/>
			</div>
			<Drawer
				title="Enter amount to withdraw"
				placement="right"
				closable={true}
				onClose={() => setDrawer(false)}
				visible={drawer}
				getContainer={false}
				style={{ position: "absolute" }}
			>
				<Card
					
					className="card-custom-extra"
					title="Amount"
				>
					<Row justify="space-around">
						<div className="card-earned-number">
							<InputNumber
								value={withdrawAmount}
								onChange={(e) => setWithdrawAmount(e)}
							/>
						</div>
					</Row>
				</Card>
				<br />
				<Button
					type="primary"
					shape="round"
					loading={loading}
					onClick={() => {
						dispatch(withdraw(streamID, withdrawAmount));
						setLoading(true);
					}}
				>
					Submit
				</Button>
			</Drawer>
		</div>
	);
};

export default TableContent;
