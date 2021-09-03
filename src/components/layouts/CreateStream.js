import React, { useState, useEffect } from "react";
import {
	Steps,
	Result,
	Layout,
	Form,
	Input,
	Button,
	InputNumber,
	Col,
	Select,
	DatePicker,
	Spin,
	Row
} from "antd";
import { SmileOutlined, SmileTwoTone } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { createStream } from "../../actions";
import { Link } from 'react-router-dom';

import { connectWallet } from "../../actions";

const { Step } = Steps;
const { Content } = Layout;
const { Option } = Select;
const { RangePicker } = DatePicker;

const rangeConfig = {
	rules: [{ type: "array", required: true, message: "Please select time!" }],
};

const CreateStream = (props) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [token, setToken] = useState();
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [amount, setAmount] = useState(0);
	const [address, setAddress] = useState("");
	const [range, setRange] = useState();
	const [loader, setLoader] = useState(false);
	const selector = useSelector((state) => state.createStream);

	const selector2 = useSelector((state) => state.walletConfig);

	const connectWalletClick = (e) => {
		e.preventDefault();
		dispatch(connectWallet());
	};

	useEffect(() => {
		if (selector2.wallet.connected) setCurrentStep(1);
	}, [selector2]);

	useEffect(() => {
		dispatch({ type: "CLEAR_RESPONSE" });
		setLoader(false);
		setCurrentStep(0);
	}, []);

	useEffect(() => {
		if (currentStep === 1) {
			setCurrentStep(2);
		}
		setRange(undefined);
		setAddress(0);
		setAmount("");
		setToken(undefined);
		setLoader(false);
	}, [selector]);

	const handleOnClick = (e) => {
		e.preventDefault();

		if (range !== undefined && amount !== 0 && address !== "") {
			setLoader(true);
			dispatch(
				createStream({
					receiverAddress: address,
					startTime: range[0].unix(),
					endTime: range[1].unix(),
					amountSpeed: amount,
				})
			);
		}
		form.resetFields();
		setRange(undefined);
		setAddress(0);
		setAmount("");
		setToken(undefined);
	};

	const stepContent = [
		<Result
			icon={<SmileOutlined />}
			title="Great, Lets get started!"
			subTitle="Streams data is saved on an system account, and we require some rent for that.
But don't worry This will be returned to you whenever you want to cancel stream along with the rewards."
			extra={
				selector2.wallet.connected ? (
					<Button type="primary" onClick={() => setCurrentStep(1)}>
						Next
					</Button>
				) : (
					<Button type="primary" onClick={connectWalletClick}>
						Connect wallet and Continue
					</Button>
				)
			}
		/>,

		<Result icon={<SmileTwoTone />} title="">
			<Spin spinning={loader}>
				<Form
					form={form}
					name="basic"
					labelCol={{ span: 5 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ remember: true }}
				>
					<Form.Item
						label="Token"
						name="Token"
						rules={[
							{ required: true, message: "Please Select Token!" },
						]}
					>
						<Select
							placeholder="Select Token you want to stream"
							onChange={setToken}
							value={token}
							allowClear
						>
							<Option value="SOL">SOL</Option>
							<Option disabled={true} value="NA1">
								Coming soon
							</Option>
							<Option disabled={true} value="NA2">
								Coming soon
							</Option>
						</Select>
					</Form.Item>
				{/* <Row justify="space-around"> */}
					<Form.Item
						label="Rate per second"
						name="Amount"
						rules={[
							{ required: true, message: "Enter a valid rate" },
						]}
					>
						<InputNumber
							value={amount}
							placeholder="Amount in Sol"
							onChange={(e) => setAmount(e)}
						/>
					</Form.Item>
					<Form.Item
						label="Amount"
						name="Amount_"
					>
						<Input
							disabled={true}
							placeholder={(range!==undefined)?amount *(range[1].unix()-range[0].unix()):0}
							// onChange={(e) => setAddress(e.target.value)}
						/>
					</Form.Item>
					{/* </Row> */}
					<Form.Item
						name="range-time-picker"
						label="Start Time - End Time"
						{...rangeConfig}
					>
						<RangePicker
							showTime
							value={range}
							format="YYYY-MM-DD HH:mm:ss"
							onChange={(e) => setRange(e)}
						/>
					</Form.Item>

					<Form.Item
						label="Recipient"
						name="Address"
						rules={[
							{
								required: true,
								message: "Enter a valid address",
							},
						]}
					>
						<Input
							value={address}
							placeholder="Enter the address of recipient."
							onChange={(e) => setAddress(e.target.value)}
						/>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 10, span: 16 }}>
						<Button
							type="primary"
							htmlType="submit"
							onClick={handleOnClick}
						>
							Submit
						</Button>
						<Button
							style={{ marginLeft: "5px" }}
							type="primary"
							onClick={() => {
								setCurrentStep(0);
							}}
						>
							Back
						</Button>
					</Form.Item>
				</Form>
			</Spin>
		</Result>,
		selector.result ? (
			<Result
				status="success"
				title="Succesfully created stream"
				subTitle={`Stream ID ${selector.id}`}
				extra={[
					<Button type="primary" key="Check_stream" onClick={()=>props.setKey("2")}>
						<Link to="/sending">
						Check stream
						</Link>
					</Button>,
					<Button
						type="secondary"
						key="create_another"
						onClick={(e) => {
							e.preventDefault();
							setCurrentStep(0);
						}}
					>
						Create Another
					</Button>,
				]}
			/>
		) : (
			<Result
				status="error"
				title="Some error occured"
				subTitle="Please check and modify the information and try agan."
				extra={[
					<Button
						type="primary"
						key="try_again"
						onClick={(e) => {
							e.preventDefault();
							setCurrentStep(0);
						}}
					>
						Try Again
					</Button>,
				]}
			></Result>
		),
	];

	return (
		<div>
			<Col className="site-page-header">
				<h3 className="page-heading">
					Stream Tokens
					<br />
					<div className="page-sub-heading">
						Just follows two simple steps to start streaming SOL.
					</div>
				</h3>
			</Col>
			<div
			className="create-stream-steps"
				style={{
					width: "100%",
					height: "80vh",
					padding: 20,
				}}
			>
				<Steps className="steps" current={currentStep}>
					<Step title="Step 1" description="Confirmation" />
					<Step title="Step 2" description="Fill the details" />
					<Step title="Step 3" description="All Done!" />
				</Steps>
				<Content className="form-content">
					{stepContent[currentStep]}
				</Content>
			</div>
		</div>
	);
};

export default CreateStream;
