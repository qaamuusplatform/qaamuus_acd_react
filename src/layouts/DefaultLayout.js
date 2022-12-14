// import node module libraries
import React, { Fragment, useEffect } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "services/currentUserContext";

// import layouts
import FooterWithLinks from "./footers/FooterWithLinks";
import NavbarDefault from "./navbars/NavbarDefault";

const DefaultLayout = (props) => {
  const { currentUser, setCurrentUser,userIsLoading } = useContext(CurrentUserContext);
  console.log(userIsLoading)
  useEffect(() => {
    document.body.style.backgroundColor = "#f5f4f8";

  });

  return (
    <Fragment>
        {userIsLoading?(<NavbarDefault isLoading />):Object.keys(currentUser).length === 0 ? (<NavbarDefault /> ) : (<NavbarDefault login />)}
  
      {/* <NavbarDefault login /> */}
      
      {/* <NavbarDefault  /> */}
      {props.children}
      <FooterWithLinks />
    </Fragment>
  );
};

export default DefaultLayout;
