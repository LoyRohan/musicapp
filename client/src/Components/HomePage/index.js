import React from "react";
import { Row, Col } from "reactstrap";
import hmOne from "Images/hmOne.jpg";
import hmTwo from "Images/hmTwo.jpg";
import hmThree from "Images/hmThree.jpg";
import hmFour from "Images/hmFour.jpg";
import hmFive from "Images/hmFive.jpg";
import hmSix from "Images/hmSix.jpg";
import hmEighth from "Images/hmEighth.jpg";
import "./Homepage.css"
import { ReactComponent as Play } from "Images/blackplay.svg";
import { useHistory } from "react-router";

const HomePage = () => {
  const history = useHistory();
  const renderImages = (src, width, height, alt, style = "", dummy = false, xs="auto", colStyle = "bg-white") => {
    if (dummy) return <Col xs={xs} className={style}></Col>
    return(
      <Col xs="auto" className={`border p-1 rounded m-2 glowBorder ${colStyle}`}>
          <img src={src} width={width} height={height} alt={alt} className={`${style} rounded`} />
      </Col>
    )
  }

  return (
    <Row className="my-auto bg-dark">
      <Col>
        <Row className="align-items-center">
          {renderImages("", "", "", "", "border-0 ", true, 1)}
          {renderImages(hmFour, 300, 250, "", "flipImage xAxis", false, "auto", " bg-secondary")}
          {renderImages(hmEighth, 250, 300, "", "flipImage y-Axis ")}
          {renderImages(hmTwo, 345, 230, "", "img-fluid", false, "auto", " bg-danger")}
          {renderImages(hmSix, 200, 270, "", "flipImage yAxisFifteen", false, "auto", " bg-warning")}
          {renderImages(hmFive, 345, 230, "", "")}
          <Col xs="12" md="2" className="border text-primary fw-bold">
            <h5 className="gradientText">Click the play button 
              to Continue</h5>
          </Col>
          <Col xs="12" md="1" className="text-center">
            <button className="p-2 glowBorder" onClick={() => history.push("/album")}>
              <Play className="text-white h5  " width="75" height="75"/>
            </button>
          </Col>
          {renderImages(hmThree, 200, 270, "", "img-fluid")}
          {renderImages(hmOne, 200, 270, "", "flipImage xAxis ")}
          {renderImages("", "", "", "", "border-0", true, 1)}
        </Row>
      </Col>
    </Row>
  );
};
export default HomePage;
