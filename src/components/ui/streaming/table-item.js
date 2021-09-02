import React, { useState } from "react";
import { Row, Col, Popover } from "antd";
import {
	QuestionCircleOutlined,
	CheckCircleTwoTone,
	DownCircleOutlined,
	UpCircleOutlined,
} from "@ant-design/icons";

import "../../css/table-item.css";
import { isMobile } from "react-device-detect";

const Tableitem = ({
	children,
	status,
	earned,
	token,
	amount,
	cardCss,
	receiver,
}) => {
	const [toggle, setToggle] = useState(false);

	return (
		<div>
			<Row
				justify="space-between"
				align="middle"
				className={`table-item ${cardCss}`}
				onClick={(e) => {
					if (!isMobile) {
						setToggle(!toggle);
					}
				}}
			>
				<h3 className="item-heading">{status}</h3>
				<Col>
					<h4 className="item-sub-heading">Earned</h4>
					<h3 className="item-heading">
						{earned}{" "}
						<Popover
							title="Reward Token(In Lamports)"
							content={
								<div>
									This is the amount of tokens earned.
									<br /> The tokens are linked with yield
									<br />
									earning strategies.
								</div>
							}
						>
							<QuestionCircleOutlined />
						</Popover>
					</h3>
				</Col>
				<Col>
					<h4 className="item-sub-heading">To</h4>
					<h3 className="item-heading">
						{receiver} <CheckCircleTwoTone />
					</h3>
				</Col>
				<Col>
					<h4 className="item-sub-heading">Token</h4>
					<h3 className="item-heading">
						{token} <CheckCircleTwoTone />
					</h3>
				</Col>
				<Col>
					<h4 className="item-sub-heading">Amount</h4>
					<h3 className="item-heading">
						{amount}{" "}
						<Popover
							title="Stream Amount(In Lamports)"
							content={
								<div>
									This is the total amount of tokens,
									<br /> Stream was created of. At the end
									<br /> of streaming time the withdraw
									<br /> amount will be equal to total amount.
								</div>
							}
						>
							<QuestionCircleOutlined />
						</Popover>
					</h3>
				</Col>
				<Col>
					{!toggle ? (
						<DownCircleOutlined
							style={{ fontSize: "25px", marginRight: 40 }}
						/>
					) : (
						<UpCircleOutlined
							style={{ fontSize: "25px", marginRight: 40 }}
						/>
					)}
				</Col>
			</Row>
			{toggle ? (
				<div
					className="table-item-body"
				>
					{children}
				</div>
			) : null}
		</div>
	);
};

export default Tableitem;
