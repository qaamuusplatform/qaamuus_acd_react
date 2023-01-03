// import node module libraries

import React, { Fragment, useState, useContext, useEffect, useRef } from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Dropdown,
  Form,
  ListGroup,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Image,
  Button,
  Card,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { httpFetcher } from "services/coursesService";
import { CurrentUserContext } from "services/currentUserContext";
import useSWR from "swr";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import InverseLogo from "assets/images/brand/logo/logo.svg";
import LiveImage from "assets/images/blog/blogpost-3.jpg";
import Avatar1 from "assets/images/avatar/avatar-1.jpg";
import { useMediaQuery } from "react-responsive";
import Icon from "@mdi/react";
import { mdiAccount, mdiCalendarArrowLeft } from "@mdi/js";





const EventWatchVr = () => {
  const { currentUser, setCurrentUser, userIsLoading } =
    useContext(CurrentUserContext);
  const { slug } = useParams();
  const { data: enrolledEventDetail, error } = useSWR(`/api/checkThisUserInrolledEvent-slug/${currentUser.id}/${slug}/`, httpFetcher);
  const localStreamVideoRef = useRef(null);

  const otherUsersStreamVideoRef=useRef(null)
  
  let localStream;
  let remoteStream;
  let peerConnection;
  const [peerVtMeeting, setPeerVtMeeting] = useState()

  const servers = {
    iceServers:[
      {
        url:['stun.l.google.com:19302','stun1.l.google.com:19302','stun2.l.google.com:19302']
      }
    ]
  }

  const qInit = async () => {
    // setLocalStream(await Promise.resolve( navigator.mediaDevices.getUserMedia({video:true,audio:true})))
    localStream=await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    localStreamVideoRef.current.srcObject = localStream;
    createOffer();
  }

  useEffect(() => {
    qInit()
  }, [enrolledEventDetail, currentUser]);

  const createOffer = async () => {
    peerConnection= new RTCPeerConnection()
    remoteStream = new MediaStream()
    otherUsersStreamVideoRef.current.srcObject=remoteStream;
    localStream.getTracks().forEach((track)=>{
      peerConnection.addTrack(track,localStream);
    })

    peerConnection.ontrack = (event)=>{
      event.streams[0].getTracks().forEach((track)=>{
        remoteStream.addTrack()
      })
    }

    peerConnection.onicecandidate = async (event)=>{
      if(event.candidate){
        console.log('new ice',event.candidate)
      }
    }


    let offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)

    console.log(offer)

  }




  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const [expandedMenu, setExpandedMenu] = useState(false);

  return (
    <div style={{ backgroundColor: "#212032" ,height:'100%',width:'100%'}} >
      <Navbar style={{ borderBottom: "1px solid grey" }}
        onToggle={(collapsed) => setExpandedMenu(collapsed)}
      >
        <Fragment>
          {/* brand logo */}
          {/* <Navbar.Brand as={Link} to="#">
            <Image src={InverseLogo} width={120} alt="" />
          </Navbar.Brand> */}
          {/* search box */}
          <div className="ms-lg-3 d-none d-md-none d-lg-block">

          </div>
          {/* Right side quick / shortcut menu  */}
          <Nav className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">
            <span className={`d-flex`}>
              <Button variant="primary" size="sm">
                {/* <Icon
                  path={mdiCalendarArrowLeft} size={0.8}
                  rotate={0} /> */}
              </Button>
              <Button variant="danger" className="ms-2" size="sm">
                {/* <Icon
                  path={mdiCalendarArrowLeft} size={1}
                  rotate={0} /> */}
              </Button>
            </span>
          </Nav>
          <Navbar.Toggle aria-controls="navbarScroll">
            <span className="icon-bar top-bar mt-0"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>
          </Navbar.Toggle>
        </Fragment>
      </Navbar>
      {/* <hr></hr> */}

      {/* body container */}
      <div  className="p-3">
        <Row>
          <Col lg={9} md={8} sm={12} >
            {/* <div className="bg-primary rounded p-0" style={{
              background: `url(${LiveImage})`,
							backgroundRepeat: 'no-repeat',
							backgroundSize: 'cover',
							backgroundPosition: 'top center',
              height:'80vh'
            }} >
            </div> */}
            <video  width='100%' ref={localStreamVideoRef} autoPlay ></video>
          </Col>

          <Col lg={3} className="pt-sm-5 pt-lg-0 pt-md-0" md={4} sm={12} >

            <div className="bg-grey border border-primary rounded" >
            
              <video  width='100%' ref={otherUsersStreamVideoRef} autoPlay ></video>
            </div>
          </Col>

          {/* <video width='200' height='300'  ref={localStreamVideoRef} autoPlay={true} playsInline /> */}
        </Row>
        <div className="" >dsadas</div>
      </div>
    </div>
  );
};
export default EventWatchVr;
