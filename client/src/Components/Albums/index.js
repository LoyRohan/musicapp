import React, {useState, useEffect} from "react";
import _ from "lodash";
import {Row, Col, Modal, Button, ModalFooter, ModalBody} from "reactstrap";
import axios from "axios";
import Consts from "const";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ContentLoader from 'react-content-loader';
 
const Album = (props) => {
    const [allAlbums, setAlbums] = useState([]),
    [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios(Consts.api.album)
        .then((data) => {
            setAlbums(data.data);
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
        })
    }, []);

    /**
     * Renders the place holder untill the api call get finish
     * @returns 
     */
     const renderContentLoader = () => {
        return [...Array(5).keys()].map((value, index) => {
            return(
                <Col xs="4" md="3" key={index}>
                    <ContentLoader viewBox="0 0 1000 300" height={300} width={"1000"}>
                        <rect x="20" y="8" rx="0" ry="0" width="250" height="250" />
                    </ContentLoader>
                </Col>
            )
        })
    };

    /**
     * Renders the error modal
     * @returns 
     */
    const renderErrorModal = () => {
        return(
            <Modal isOpen={true} centered={true}>
                <ModalBody>
                    <h5>Not able to find the songs kindly go back to the album section.</h5>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary">
                        <Link className="text-white text-decoration-none" to={"/"}> Redirect To Albums</Link>
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

    /**
     * Renders the albums persent
     * @returns 
     */
    const renderAlbums = () => {
        if (isLoading) return renderContentLoader();

        if (_.isEmpty(allAlbums)) return renderErrorModal();

        return allAlbums.map(({image, title, redirectRoute}, index) => {
            let StyledLink = styled(Link)`
                {
                    cursor: pointer;
                    display: grid;
                    height: 230px;
                    width: 230px;
                    place-items: center;
                    place-content: center;
                    background: linear-gradient(135deg, hsl(303, 100%, 11%, 0.65), hsl(185, 86%, 31%, 0.65)), url(${image}) no-repeat center center / cover;
                }
            `
            return(
                <Col xs="6" md="3" className="rounded" key={index}>
                    <StyledLink className="text-white m-3 rounded" to={`${Consts.fields.album.redirectUrl}${redirectRoute}`}>
                        <h5>{title}</h5>
                    </StyledLink>
                </Col>
            )
        })
    }

    return(
        <Row className="justify-content-center align-items-center mt-4">
            {renderAlbums()}
        </Row>
    )
};

export default Album;