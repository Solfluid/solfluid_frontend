import React from "react";
import { useRive } from "rive-react";
import { Row } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { connectWallet } from "../../actions";
import { isMobile } from "react-device-detect";

const Dashboard = ({ collapsed, setKey }) => {
	const selector = useSelector((state) => state.walletConfig);
	const dispatch = useDispatch();

	const handleOnClick = (e) => {
		e.preventDefault();
		dispatch(connectWallet());
	};

	const { RiveComponent } = useRive({
		src: "https://cdn.jsdelivr.net/gh/NishantChandla/jsdelivr@master/balloonist_white.riv",
		stateMachines: "Balloon State Machine",
		autoplay: true,
	});

	return (
		<div style={{ height: "100%", width: "100%", borderRadius: "1%" }}>
			<Row align="right">
				<RiveComponent className="balloon-animation" />
				<div>
					{/* <div className="animator" style={{height:"40vh", width:"40vh", marginLeft:"auto"}}/> */}
					{/* <Row justify="center"> */}
					<div
						style={{
							padding: 20,
							marginTop: "20vh",
							marginLeft: 30,
						}}
					>
						<h2
							className="home-header"
							style={{ fontWeight: "600" }}
						>
							The future is real time <br /> finance{" "}
						</h2>
					</div>
					<Row>
						{!selector.wallet.connected ? (
							<button
								className="animated-button"
								style={{ marginLeft: 75 }}
								onClick={handleOnClick}
							>
								<div class="left-btn"></div>
								<LoginOutlined /> Connect Wallet
								<div class="right-btn"></div>
							</button>
						) : null}
						{!isMobile ? (
							<button
								className="animated-button2"
								style={{
									marginLeft: `${
										selector.wallet.connected
											? "75px"
											: "10px"
									}`,
								}}
								onClick={(e) => {
									e.preventDefault();
									setKey("3");
								}}
							>
								<div class="left-btn"></div>
								<Link to="receiving">View Streams</Link>
								<div class="right-btn"></div>
							</button>
						) : null}
					</Row>
					{/* </Row> */}
				</div>
			</Row>
			{/**animation**/}
			<Row
				style={{
					position: "absolute",
					bottom: 0,
					right: 0,
					left: `${collapsed ? "80px" : "200px"}`,
				}}
			>
				<svg
					className="waves"
					xmlns="http://www.w3.org/2000/svg"
					xlink="http://www.w3.org/1999/xlink"
					viewBox="0 24 150 28"
					preserveAspectRatio="none"
					shapeRendering="auto"
				>
					<defs>
						<path
							id="gentle-wave"
							d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
						/>
					</defs>
					<g className="parallax">
						<use
							href="#gentle-wave"
							x="48"
							y="0"
							fill="rgba(157, 228, 252,0.7)"
						/>
						<use
							href="#gentle-wave"
							x="48"
							y="3"
							fill="rgba(157, 228, 252,0.5)"
						/>
						<use
							href="#gentle-wave"
							x="48"
							y="5"
							fill="rgba(157, 228, 252,0.3)"
						/>
						<use
							href="#gentle-wave"
							x="48"
							y="7"
							fill="rgba(157, 228, 252,1)"
						/>
					</g>
				</svg>
			</Row>
		</div>
	);
};

export default Dashboard;
