import React, { useEffect } from 'react';
import lottie from 'lottie-web';
import { useRive } from 'rive-react';
import { Row, Col } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

const Dashboard = ({ collapsed }) => {

    const { RiveComponent, rive } = useRive({
        src: 'https://cdn.jsdelivr.net/gh/NishantChandla/jsdelivr@master/balloonist_white.riv',
        stateMachines: 'Balloon State Machine',
        autoplay: true,
    });

    useEffect(()=>{
        // rive.play();
        // lottie.loadAnimation({
        //     container: document.querySelector(".animator"),
        //     renderer: 'svg',
        //     loop: true,
        //     autoplay: true,
        //     path: 'https://assets4.lottiefiles.com/private_files/lf30_czqpucro.json'
        // });
        // return ()=>{
        //     if(document.querySelector(".animator")!==null){
        //         document.querySelector(".animator").removeChild(document.querySelector(".animator").firstChild);
        //     }
        // }
    },[]);

    return (
        <div style={{height:"100%", width:"100%", borderRadius:'1%'}}>
            <Row align="right">
                <RiveComponent className="balloon-animation"/>
                <div>  
                    {/* <div className="animator" style={{height:"40vh", width:"40vh", marginLeft:"auto"}}/> */}
                    {/* <Row justify="center"> */}
                    <div style={{padding: 20, marginTop:"20vh", marginLeft:30}}>
                        <h2 className="home-header" style={{fontWeight:'600'}}>The future is real time <br/> finance </h2>
                    </div>
                    <Row>
                    <button className="animated-button">
                        <div class="left-btn"></div>
                           <LoginOutlined/>  Connect Wallet
                        <div class="right-btn"></div>
                    </button>
                    </Row>
                    {/* </Row> */}
                </div>
            </Row>
            {/**animation**/}
            <Row style={{position:"absolute", bottom:0, right:16, left:`${collapsed?'96px':'216px'}`, bottom:20}}>
                <svg className="waves" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className="parallax">
                        <use href="#gentle-wave" x="48" y="0" fill="rgba(157, 228, 252,0.7)" />
                        <use href="#gentle-wave" x="48" y="3" fill="rgba(157, 228, 252,0.5)" />
                        <use href="#gentle-wave" x="48" y="5" fill="rgba(157, 228, 252,0.3)" />
                        <use href="#gentle-wave" x="48" y="7" fill="rgba(157, 228, 252,1)" />
                    </g>
                </svg>
            </Row>
        </div>
    );
}

export default Dashboard;