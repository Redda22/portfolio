import React, { useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import Io from './InternalRender/Io/Io';

import './projectPage.scss';

import ProjectList from '../../config/ProjectsList.json';

import { useRecoilState } from 'recoil';
import { isLoadingState } from '../../config/RecoilStates/isLoadingState';
import { previousPageState } from '../../config/RecoilStates/previousPageState';

import arrow from '../../Assets/Vectors/directions/arrow.svg';


function ProjectPage() {

    const baseUrl = "https://www.redda.fr/portfolio-data/projectsMedia/";
    const mainTitle = useParams().mainTitle;
    const externalLink = ProjectList.find(item => item.mainTitle === mainTitle);
    // eslint-disable-next-line no-unused-vars
    const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
    // eslint-disable-next-line no-unused-vars
    const [previousPage, setPreviousPage] = useRecoilState(previousPageState);


    const navigate = useNavigate();

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        async function endIsLoading() {
            await new Promise(resolve => setTimeout(resolve, 300));
            setIsLoading(false);
        }
        endIsLoading();
    }, [])

    async function goBack() {
        setPreviousPage(true);
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 300));
        navigate('/');
    }


    if (!externalLink) {
        return <Navigate to="/404" />;
    }
    else {
        
        const shouldRenderIframe = externalLink && externalLink.links[0] && externalLink.links[0].externalLink === true;

        return (
            <div className='ProjectPage'>
                {shouldRenderIframe ?
                    <iframe title={mainTitle} src={`${baseUrl}${mainTitle}/build/index.html`} sandbox='allow-scripts' />
                    :
                    mainTitle === "Io" ? <Io/> : null
                }
                <button onClick={goBack}><img src={arrow} alt="arrow" /></button>
            </div>
        );
    }
}

export default ProjectPage;