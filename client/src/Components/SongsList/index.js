import React, {useState, useEffect} from "react";
import _ from "lodash";
import {Row, Col, Button,Modal, ModalFooter, ModalBody} from 'reactstrap';
import { Link } from "react-router-dom";
import Consts from "const";
import { ReactComponent as FavIcon } from "Images/fav.svg";
import ContentLoader from 'react-content-loader';
import axios from "axios";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import AudioPlayer from "Components/AudioPlayer";
import Localstoreage from "localStorage";

const SongList = (props) => {
    const [songsList, setSongsList] = useState([]),
    [favSognsList, updateFavList] = useState([]),
    [isLoading, setLoading] = useState(false),
    location = useLocation(),
    localStoreData = new Localstoreage(),
    [songIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        let apiCaller = (reqRoute) => {
            setLoading(true);
            axios(reqRoute)
                .then(({data}) => {
                    setSongsList(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                })
                return;
        };

            if (localStoreData.getItem(Consts.localStorageKeys.favList)) {
                let favSongsList = localStoreData.getItem(Consts.localStorageKeys.favList);
                updateFavList(favSongsList);
                if (props.favSongs) {
                    setLoading(true);
                    axios.post('/favlist', favSongsList)
                        .then(({data}) => {
                            setLoading(false);
                            setSongsList(data);
                        })
                        .catch(function (error) {
                            setLoading(false);
                            console.log(error);
                        });
                    return;
                }
            }

        if (props.allSongs) return apiCaller(Consts.api.songs);
        apiCaller(location.pathname);
    }, [])

    /**
     * Renders the place holder untill the api call get finish
     * @returns 
     */
    const renderContentLoader = () => {
        return [...Array(10).keys()].map((value, index) => {
            return(
                <Row key={index} className="mt-5 border">
                    <Col xs="12">
                        <ContentLoader viewBox="0 0 1000 130" height={130} width={"1000"} {...props}>
                            <rect x="20" y="8" rx="0" ry="0" width="100" height="100" />
                            <rect x="170" y="20" rx="0" ry="0" width="500" height="15" />
                            <rect x="170" y="50" rx="0" ry="0" width="300" height="15" />
                        </ContentLoader>
                    </Col>
                </Row>
            )
        })
    };

    /**
     * Renders the error modal to redirect to albums
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
                        <Link className="text-white text-decoration-none" to={Consts.fields.album.redirectUrl}> Redirect To Albums</Link>
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

    const favListCheck = (identifier, index) => {
        let data = localStoreData.getItem(Consts.localStorageKeys.favList) ? localStoreData.getItem(Consts.localStorageKeys.favList) : [], 
        newFavList = [];
        if (data.includes(identifier)) {
            newFavList = data.filter((value, index) => value !== identifier);
        }
        else {
            newFavList = [...data, identifier]
        }

        updateFavList(newFavList);
        if (props.favSongs) {
            let sentSongs = songsList.filter((value, index) =>  !newFavList.includes(value.key))
            setSongsList(sentSongs);
        }
        localStoreData.setItem(Consts.localStorageKeys.favList, newFavList);
    };

    const playSelectedSong = (index) => {
        setSelectedIndex(index);
    } 

    /**
     * @returns Renders the songs list 
     */
    const renderSongsList = () => {
        if (isLoading) return renderContentLoader();

        if (_.isEmpty(songsList) && !props.favSongs) return renderErrorModal();
        if (props.favSongs && _.isEmpty(favSognsList)) {
            return(
                <Modal isOpen={true} centered={true}>
                <ModalBody>
                    <h5>No Songs present in the Fav list Kindly add the songs to you'r Favoraite List</h5>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary">
                        <Link className="text-white text-decoration-none" to={Consts.fields.album.redirectUrl}> Redirect To Albums</Link>
                    </Button>
                    <Button color="primary">
                        <Link className="text-white text-decoration-none" to={Consts.fields.songs.redirectUrl}> Redirect To All Songs</Link>
                    </Button>
                </ModalFooter>
            </Modal> 
            )
        }

        return songsList.map(({alt, image, title, artist, key}, index) => {
            let StyledRow = styled(Row)`
                {
                    cursor: pointer;
                    background: linear-gradient(135deg, hsl(206, 86%, 53%, 0.65), hsl(4, 90%, 58%, 0.65));
                }
            `
            return (
                <StyledRow key={index} className="align-items-center my-3 bg-primary py-2">
                    <Col xs="8" md="2" className="text-center" onClick={() => playSelectedSong(index)}>
                        <img src={image} alt={alt} width="100" height="100" className="rounded"/>
                    </Col>
                    <Col xs="12" md="8" onClick={() => playSelectedSong(index)}>
                        <Row>
                            <Col xs="auto" >
                                <h5>Title:</h5>
                            </Col>
                            <Col xs="auto" className="pl-2">
                                <h5>{title}</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="auto" >
                                <div>Artist:</div>
                            </Col>
                            <Col xs="auto" className="pl-2">
                                <div>{artist}</div>
                            </Col>
                        </Row>                        
                    </Col>
                    <Col xs="4" md="2" onClick={() => favListCheck(key, index)}>
                        <FavIcon className={favSognsList.includes(key) ? "text-warning" : "text-white"} />
                    </Col>
                </StyledRow>     
            )
        })
    };

    const renderPlayerContentLoader = () => {
        return <div>conteen loader</div>
    }

    /**
     * renders the Music player for the user
     * @returns 
     */
    const renderMusicPlayer = () => {
        if (isLoading) {
            return renderPlayerContentLoader()
        }

        if (!_.isEmpty(songsList)) {
            return <AudioPlayer tracks={songsList} trackIndex={songIndex} />
        }
    } 

    return (
        <Row>
            <Col xs="12">{renderSongsList()}</Col>
            <Col xs="12" className="fixed-bottom">{renderMusicPlayer()}</Col>
        </Row>
    )
};

export default SongList;

