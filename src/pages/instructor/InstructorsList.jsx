// import node module libraries
import { Col, Row, Container, Form, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { Fragment, useState, useEffect } from "react";

// import custom components
// import FormSelect from 'components/elements/custom/FormSelect';
import useSWR from "swr";
import { toast } from "react-toastify";
import { httpFetcher } from "services/coursesService";
export default function Members() {
  const { data: instructorsList, error } = useSWR("api/userProfile-list/", httpFetcher);

  if (error) {
    toast.error(error);
  }

  return (
    <Fragment>
   
    </Fragment>
  );
}
