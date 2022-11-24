// import node module libraries
import React, { useEffect, useState } from "react";
import { login } from "services/authService";

import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Card, Form, Button, Image } from "react-bootstrap";

// import media files
import Logo from "assets/images/brand/logo/logo-icon.svg";

const getData = async () => {
  await login({
    username: "252615129181",
    password: "8085",
  });
};

export default function SignIn() {
  useEffect(() => {
    getData();
  }, []);
  return <div>SignIn</div>;
}
