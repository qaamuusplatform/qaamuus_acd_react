// import node module libraries

import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt";
import { END_POINT } from "helper/constants";
import React, { Fragment, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { httpFetcher } from "services/coursesService";
import { CurrentUserContext } from "services/currentUserContext";
import useSWR from "swr";

const EventWatchLive = () => {
  const meeting = new VideoSDKMeeting();
  const { currentUser } = useContext(CurrentUserContext);
  const { slug } = useParams();
  const { data: enrolledEventDetail, error } = useSWR(
    `/api/checkThisUserInrolledEvent-slug/${currentUser.id}/${slug}/`,
    httpFetcher
  );
  let meetingConfig = {};

  // const runMeetingSdk = async () => {
  //     if (!enrolledEventDetail && !error) {

  //     } else {
  //         if (enrolledEventDetail.exists == true) {
  //             if (enrolledEventDetail.theEvent.persenter.id == currentUser.id) {
  //             } else {
  //                 meetingConfig = hostConfig()
  //             }
  //             meeting.init(meetingConfig);
  //         } else {

  //         }
  //     }
  // };

  useEffect(() => {
    if (enrolledEventDetail) {
      const coHostsConfig=()=>{}
      const participantConfig = () => {
        return {
          name: `${currentUser.fullName}`,
          apiKey: "e149227c-a781-4093-87c6-627b0db2073e", // generated in step 1
          meetingId: `${enrolledEventDetail.theEvent.meetingId}`, // enter your meeting id
          theme: "DARK", // DARK || LIGHT || DEFAULT
          containerId: null,
          
          mode: "VIEWER", // VIEWER || CONFERENCE

          chatEnabled: true,
          screenShareEnabled: false,
          pollEnabled: false,
          raiseHandEnabled: true,

          brandingEnabled: true,
          brandLogoURL: "https://qaamuusbackend.up.railway.app/media/images/logos/logoCard.svg",
          brandName: "QAAMUUS ACADEMY",
          poweredBy: true,
          hls: {
            playerControlsVisible: false,
          },

          participantCanLeave: true, // if false, leave button won't be visible

          // Live stream meeting to youtube
          livestream: {
            autoStart: false,
            outputs: [
              // {
              //   url: "rtmp://x.rtmp.youtube.com/live2",
              //   streamKey: "<STREAM KEY FROM YOUTUBE>",
              // },
            ],
          },
          
          permissions: {
            // changeLayout: true,
          },
          layout: {
            type: "SIDEBAR", // "SPOTLIGHT" | "SIDEBAR" | "GRID"
            priority: "SPEAKER", // "SPEAKER" | "PIN",
            // gridSize: 3,
          },

          joinScreen: {
            visible: true, // Show the join screen ?
            title: "QAAMUUS ACADEMY", // Meeting title
          },


          leftScreen: {
            // visible when redirect on leave not provieded
            actionButton: {
              // optional action button
              label: "QAAMUUS ACADEMY", // action button label
              href: "https://qaamuus.netlfy.app/", // action button href
            },
          },

          notificationSoundEnabled: true,

          maxResolution: "sd",
        };
      };

      const hostConfig = () => {
        return {
          name: `${currentUser.fullName}`,
          apiKey: "e149227c-a781-4093-87c6-627b0db2073e", // generated in step 1
          meetingId: `${enrolledEventDetail.theEvent.meetingId}`, // enter your meeting id
          theme: "DARK", // DARK || LIGHT || DEFAULT
          containerId: null,
          micEnabled: true,
          webcamEnabled: true,
          participantCanToggleSelfWebcam: true,
          participantCanToggleSelfMic: true,
          layout: {
            type: "SIDEBAR", // "SPOTLIGHT" | "SIDEBAR" | "GRID"
            priority: "SPEAKER", // "SPEAKER" | "PIN",
            // gridSize: 3,
          },
          hls: {
            enabled: true,
            autoStart: false,
            theme: "DARK", // DARK || LIGHT || DEFAULT
          },
          
          chatEnabled: true,
          screenShareEnabled: true,
          pollEnabled: true,
          whiteboardEnabled: true,
          raiseHandEnabled: true,

          brandingEnabled: true,
          brandLogoURL: `${END_POINT}+/media/images/logos/logoCard.svg`,
          brandName: "QAAMUUS ACADEMY",
          poweredBy: true,

          participantCanLeave: true, // if false, leave button won't be visible

          // Live stream meeting to youtube
          livestream: {
            autoStart: false,
            outputs: [
              // {
              //   url: "rtmp://x.rtmp.youtube.com/live2",
              //   streamKey: "<STREAM KEY FROM YOUTUBE>",
              // },
            ],
          },
          // waitingScreen: {
          //     imageUrl: "<imageUrl || lottieUrl>",
          //     text: "Connecting to the meeting...",
          // },
          recording: {
            enabled: true,
            webhookUrl: "https://www.videosdk.live/callback",
            awsDirPath: `/meeting-recordings/${enrolledEventDetail.theEvent.meetingId}/`, // Pass it only after configuring your S3 Bucket credentials on Video SDK dashboard
            autoStart: false,
            theme: "DARK", // DARK || LIGHT || DEFAULT

            layout: {
              type: "SIDEBAR", // "SPOTLIGHT" | "SIDEBAR" | "GRID"
              priority: "PIN", // "SPEAKER" | "PIN",
              //   gridSize: 3,
            },
          },
          mode: "CONFERENCE", // VIEWER || CONFERENCE
          permissions: {
            toggleParticipantMode: true,
            toggleHls: true,
            
            changeLayout: true,
            canCreatePoll: true,
            pin: true,
            removeParticipant: true,
            askToJoin: false, // Ask joined participants for entry in meeting
            toggleParticipantMic: true, // Can toggle other participant's mic
            toggleParticipantWebcam: true, // Can toggle other participant's webcam
            toggleParticipantScreenshare: true, // Can toggle other partcipant's screen share
            drawOnWhiteboard: true, // Can draw on whiteboard
            toggleWhiteboard: true, // Can toggle whiteboard
            toggleRecording: true, // Can toggle meeting recording
            removeParticipant: true, // Can remove participant
            endMeeting: true, // Can end meeting
          },
          

          joinScreen: {
            visible: true, // Show the join screen ?
            title: "QAAMUUS ACADEMY", // Meeting title
          },

          leftScreen: {
            // visible when redirect on leave not provieded
            actionButton: {
              // optional action button
              label: "QAAMUUS ACADEMY", // action button label
              href: "https://qaamuus.netlfy.app/", // action button href
            },
          },

          notificationSoundEnabled: true,

          maxResolution: "sd", // "hd" or "sd"
          /**
                     FEATURE ATTRIBUTES
                    */
        };
      };
      if (currentUser.id == enrolledEventDetail.theEvent.persenter.pk) {
        meetingConfig = hostConfig();
        meeting.init(meetingConfig);
      } else {
        meetingConfig = participantConfig();
        meeting.init(meetingConfig);
      }
    }
  }, [enrolledEventDetail, currentUser]);

  return <div></div>;
};

export default EventWatchLive;
