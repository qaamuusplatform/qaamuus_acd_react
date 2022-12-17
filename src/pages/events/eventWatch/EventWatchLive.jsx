// import node module libraries

import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt";
import React, { Fragment, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { httpFetcher } from "services/coursesService";
import { CurrentUserContext } from "services/currentUserContext";
import useSWR from "swr";


const EventWatchLive = () => {

    const meeting = new VideoSDKMeeting();
    const { currentUser } = useContext(CurrentUserContext);
    const { slug } = useParams();
    const { data: enrolledEventDetail, error } = useSWR(`/api/checkThisUserInrolledEvent-slug/${currentUser.id}/${slug}/`, httpFetcher);
    let meetingConfig = {}

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
            const participantConfig = () => {
                return {
                    name: `${currentUser.fullName}`,
                    apiKey: "e149227c-a781-4093-87c6-627b0db2073e", // generated in step 1
                    meetingId: 'maxamednuurxaashi', // enter your meeting id
                    theme: "DARK",// DARK || LIGHT || DEFAULT
                    containerId: null,
                    micEnabled: false,
                    webcamEnabled: false,
                    participantCanToggleSelfWebcam: true,
                    participantCanToggleSelfMic: true,

                    chatEnabled: true,
                    screenShareEnabled: false,
                    pollEnabled: false,
                    whiteboardEnabled: false,
                    raiseHandEnabled: true,

                    brandingEnabled: true,
                    brandLogoURL: "https://picsum.photos/200",
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
                    permissions: {
                        // ... other permissions
                        removeParticipant: false,
                    },


                    joinScreen: {
                        visible: true, // Show the join screen ?
                        title: "QAAMUUS ACADEMY", // Meeting title
                    },

                    pin: {
                        allowed: false, // participant can pin any participant in meeting
                        layout: "SIDEBAR", // meeting layout - GRID | SPOTLIGHT | SIDEBAR
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
            }

            const hostConfig = () => {
                return {
                    name: `${currentUser.fullName}`,
                    apiKey: "e149227c-a781-4093-87c6-627b0db2073e", // generated in step 1
                    meetingId: "maxamednuurxaashi", // enter your meeting id
                    theme: "DARK",// DARK || LIGHT || DEFAULT
                    containerId: null,
                    micEnabled: true,
                    webcamEnabled: true,
                    participantCanToggleSelfWebcam: true,
                    participantCanToggleSelfMic: true,

                    chatEnabled: true,
                    screenShareEnabled: true,
                    pollEnabled: true,
                    whiteboardEnabled: true,
                    raiseHandEnabled: true,

                    recordingEnabled: false,
                    recordingWebhookUrl: "https://www.videosdk.live/callback",
                    recordingAWSDirPath: `/meeting-recordings/maxamednuurxaashi/`, // automatically save recording in this s3 path
                    autoStartRecording: false, // auto start recording on participant joined

                    brandingEnabled: true,
                    brandLogoURL: "https://picsum.photos/200",
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
                    permissions: {
                        // ... other permissions
                        removeParticipant: true,
                    },
                    permissions: {
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

                    pin: {
                        allowed: true, // participant can pin any participant in meeting
                        layout: "SPOTLIGHT", // meeting layout - GRID | SPOTLIGHT | SIDEBAR
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
            }
            if (currentUser.id == enrolledEventDetail.theEvent.persenter.id) {
                console.log(currentUser.id)
                console.log('estt',enrolledEventDetail.theEvent.persenter.id)
                meetingConfig = hostConfig()
                meeting.init(meetingConfig);
            } else {
                meetingConfig = participantConfig()
                meeting.init(meetingConfig);
            }
        }
    }, [enrolledEventDetail,currentUser]);

    return (
        <div>

        </div>
    );
};

export default EventWatchLive;
