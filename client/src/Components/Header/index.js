import React from "react";
import { Row, Col } from "reactstrap";
import {ReactComponent as Home} from "Images/home.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Row className="hederColor py-2 border-3 border-bottom  border-info">
      <Col xs="12" md="10"></Col>
      <Col xs="12" md="2" class="text-end mr-3">
          <Link to="/" >
            <Home className="text-white mx-2" width="30" height="30"/>
          </Link>
      </Col>
    </Row>
  );
};

export default Header;
