import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isLoadingState } from '../../../../config/RecoilStates/isLoadingState';

import { useNavigate } from 'react-router-dom';
import './Project.scss';

import webLinkVector from '../../../../Assets/Vectors/platformsVectors/weblinkVector.svg';
import githubVector from '../../../../Assets/Vectors/platformsVectors/githubVector.svg';

function Project({ displayedProject, title, mainTitle, mediaFile, usedTechs, description, links }) {
    const [media, setMedia] = useState('');
    const [mediaType, setMediaType] = useState('');
    const mediaUrl = "https://www.redda.fr/portfolio-data/projectsMedia/" + mainTitle + "/" + mediaFile;
    const [isPortrait, setIsPortrait] = useState(true);

    const [hovered, setHovered] = useState(false);

    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [isLoading, setIsLoading] = useRecoilState(isLoadingState);

    async function fetchMedia(url) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    // 'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('error');
            }
            else {
                const mediaBlob = await response.blob();
                setMedia(URL.createObjectURL(mediaBlob));

                if (mediaFile.includes("png") || mediaFile.includes("jpg") || mediaFile.includes("jpeg") || mediaFile.includes("svg")) {

                    // Vérification des dimention de l'image
                    const image = new Image();
                    image.src = URL.createObjectURL(mediaBlob);
                    image.onload = function () {
                        if (this.height > this.width) {
                            setIsPortrait(true);
                        } else {
                            setIsPortrait(false);
                        }
                    }

                    setMediaType("image");
                }
                else if (mediaFile.includes("mp4") || mediaFile.includes("avi") || mediaFile.includes("mov") || mediaFile.includes("mkv")) {
                    setMediaType("video");
                }
            }
        }

        catch (error) {
            console.error('Error fetching data:', error);
            //throw error;
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (mediaFile) {
            fetchMedia(mediaUrl);
        }
    }, []);

    //const videoRef = useRef(null);

    async function linkClick(link) {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 300));

        navigate(link);
    }



    return (
        <div className={displayedProject ? "Project displayedProject" : "Project"} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <h1 className={hovered ? "ProjectTitle hovered" : "ProjectTitle"}>{title}</h1>
            <p className={hovered ? "UsedTechs hovered" : "UsedTechs"}>{usedTechs}</p>
            <p className={hovered ? "ProjectDescription hovered" : "ProjectDescription"}>{description}</p>
            {
                mediaType === "image" ?
                    <img
                        className={`${"imgProject"} ${isPortrait ? "portrait" : "landscape"} ${hovered ? "hovered" : ""}`}
                        src={media ? media : null}
                        alt={mediaFile} />

                    // : mediaType === "video" ?

                    // <video autoPlay ref={videoRef}>
                    //     <source src={media} />
                    // </video>

                    // <video
                    //     ref={videoRef}
                    //     muted
                    //     className={hovered ? "hovered" : null}
                    // >
                    // </video>
                    : null
            }
            <div className='textZone'></div>
            <div className={hovered ? "ButtonsDiv hovered" : "ButtonsDiv"}>
                {
                    links.map((link, index) => (

                        link.platform === "webLink" ?
                            <button onClick={() => linkClick(link.link)} key={index}>
                                <img src={link.platform === "webLink" ? webLinkVector : link.platform === "github" ? githubVector : null} alt="vector" />
                            </button>
                            : link.platform === "github" ?
                                <a
                                    href={link.link}
                                    target='_blank'
                                    rel="noreferrer"
                                    key={index} >
                                    <img src={link.platform === "webLink" ? webLinkVector : link.platform === "github" ? githubVector : null} alt="vector" />
                                </a>
                                :
                                null

                    ))
                }
            </div>

        </div>
    );
}

export default Project;