// import node module libraries

import React, { Fragment, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { httpFetcher } from "services/coursesService";
import { CurrentUserContext } from "services/currentUserContext";
import useSWR from "swr";


const EventWatchVr = () => {

    const { currentUser } = useContext(CurrentUserContext);
    const { slug } = useParams();
    const { data: enrolledEventDetail, error } = useSWR(`/api/checkThisUserInrolledEvent-slug/${currentUser.id}/${slug}/`, httpFetcher);
   
    useEffect(() => {
        
    }, [enrolledEventDetail,currentUser]);

    return (
        <div>

        </div>
    );
};

export default EventWatchVr;
