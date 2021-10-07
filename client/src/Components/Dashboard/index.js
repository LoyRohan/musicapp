import React from "react";
import {Row, Col} from "reactstrap";
import Navbar from "Components/Navbar";
import DashboardSection from "Components/DashboardSection";
import Header from "Components/Header";

const Dashboard = () => {
    return(
        <Row>
            <Col xs="12">
                <Header />
            </Col>
            <Col>
                <Row>
                    <Col xs="auto" className="d-none d-md-block" style={{ minHeight: "75vh" }}>
                        <Navbar />           
                    </Col>
                    <Col xs="12" md="10">
                        <DashboardSection />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
};

export default Dashboard;