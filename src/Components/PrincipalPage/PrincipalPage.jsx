import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import particleOptions from './config/particlesSettings.js';

import './PrincipalPage.scss';
import '../../config/colors.scss';

import ProfilePicture from '../../Assets/Images/profilePicture.jpg';
// Vectors
import COI from '../NotPageComponents/COI/COI.jsx';
import webVector from '../../Assets/Vectors/web.svg';
import roboticVector from '../../Assets/Vectors/robotic.svg';
import droneVector from '../../Assets/Vectors/drone.svg';
import blockchainVector from '../../Assets/Vectors/blockchain.svg';
import arrow from '../../Assets/Vectors/directions/arrow.svg';
import arrowBegin from '../../Assets/Vectors/directions/arrowBegin.svg';

import LangsData from '../../config/Langs/Langs.json';
import { useRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { languageState } from '../../config/RecoilStates/languageState.js';
import { filterState } from '../../config/RecoilStates/filterState.js';
import { isLoadingState } from '../../config/RecoilStates/isLoadingState.js';
import { previousPageState } from '../../config/RecoilStates/previousPageState.js';

import Project from '../NotPageComponents/Projects/Project/Project.jsx';
import ProjectsList from '../../config/ProjectsList.json';

import Header from '../NotPageComponents/Header/Header.jsx';


function PrincipalPage() {
    /* Particles */
    const [init, setInit] = useState(false);
    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            //await loadAll(engine);
            //await loadFull(engine);
            await loadSlim(engine);
            //await loadBasic(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);
    const particlesLoaded = container => {
        //console.log(container);
    };

    const language = useRecoilValue(languageState);

    /* Filter Settings */
    const [filteredProjects, setFilteredProjects] = useState(ProjectsList);
    const [filter, setFilter] = useRecoilState(filterState);
    const [txtFilter, setTxtFilter] = useState("");

    const [filterLoading, setFilterLoading] = useState(false);

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        const listen = async () => {
            if (!filterLoading) {
                setFilterLoading(true);
                await new Promise(resolve => setTimeout(resolve, 200));
                scrollLeft(0);
                switch (filter) {
                    case 0:
                        setTxtFilter("");
                        break;
                    case 1:
                        setTxtFilter("web");
                        break;
                    case 2:
                        setTxtFilter("robotic");
                        break;
                    case 3:
                        setTxtFilter("blockchain");
                        break;
                    default:
                        setTxtFilter("");
                }
                setTimeout(() => {
                    setFilterLoading(false);
                }, 200);
            }
        };

        listen();
    }, [filter]);

    useEffect(() => {
        const updateFilteredProjects = () => {
            if (txtFilter === "") {
                setFilteredProjects(ProjectsList);
            } else {
                setFilteredProjects(ProjectsList.filter(project => project.type === txtFilter));
            }
        };
        const timeoutId = setTimeout(updateFilteredProjects, 50);
        return () => clearTimeout(timeoutId);
    }, [txtFilter]);


    /* Slider Settings */
    const sliderRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);
    let slider = sliderRef.current;
    const [sliderScrollLeft, setSliderScrollLeft] = useState(0);
    const [arrowStart, setArrowStart] = useState();
    const [arrowEnd, setArrowEnd] = useState();


    const scrollLeft = (zero) => {
        if (!isScrolling && slider) {
            const sliderWidth = slider.offsetWidth - 7 * window.innerWidth / 100;
            setIsScrolling(true);
            if (zero != null) {
                slider.scrollLeft = 0;
            }
            else {
                slider.scrollLeft -= sliderWidth;
            }
            setTimeout(() => setIsScrolling(false), 600);
        }
    };
    const scrollRight = () => {
        if (!isScrolling && slider) {
            const sliderWidth = slider.offsetWidth - 7 * window.innerWidth / 100;
            setIsScrolling(true);
            slider.scrollLeft += sliderWidth;
            setTimeout(() => setIsScrolling(false), 600);
        }
    };

    const handleScrollSlider = () => {
        const newScrollSlider = slider.scrollLeft;
        setSliderScrollLeft(newScrollSlider);
    };

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        if (slider) {
            slider.addEventListener('scroll', handleScrollSlider);
            return () => {
                slider.removeEventListener('scroll', handleScrollSlider);
            };
        }
    }, [slider]);

    useEffect(() => {
        if (filteredProjects.length > 3) {
            if (sliderScrollLeft === 0) {
                setArrowStart(true);
                setArrowEnd(false);
            }
            else if (sliderScrollLeft + slider.clientWidth === slider.scrollWidth) {
                setArrowStart(false);
                setArrowEnd(true);
            }
            else {
                setArrowStart(false);
                setArrowEnd(false);
            }
        }
        else {
            setArrowStart(true);
            setArrowEnd(true);
        }

    }, [sliderScrollLeft, filteredProjects, slider])


    const ProjectView = useRef(null);

    // eslint-disable-next-line no-unused-vars
    const [isLoading, setIsLoading] = useRecoilState(isLoadingState);



    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        async function loadingDissapear() {
            await new Promise(resolve => setTimeout(resolve, 300));
            setIsLoading(false);
        }
        loadingDissapear();
    }, [])

    const [previousPage, setPreviousPage] = useRecoilState(previousPageState);


    useEffect(() => {
        if (previousPage && ProjectView.current) {
            const topPosition = ProjectView.current.offsetTop;
            window.scrollTo({
                top: topPosition,
                behavior: 'auto'
            });
            setPreviousPage(false);
        }
    }, [previousPage, setPreviousPage]);

    function correctProjectsView() {
        if (ProjectView.current && window.scrollY !== 0 && window.scrollY !== null) {
            const topPosition = ProjectView.current.offsetTop;
            window.scrollTo({
                top: topPosition,
                behavior: 'smooth'
            });
        }
    }

    const navigate = useNavigate();

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .sendForm('service_4pfoa4b', 'template_0u6uguk', form.current, {
                publicKey: 'Xcbj-rd3-jiZiZljy',
            })
            .then(
                () => {
                    alert('SUCCESS!');
                    navigate('/');
                },
                (error) => {
                    alert('FAILED...', error.text);
                },
            );
    };

    const [filterStateTxt, setFilterStateTxt] = useState("");








    return (
        <div className="PrincipalPage">
            <Header />
            <section className='BeginView'>
                {init && (
                    <Particles
                        id='tsparticles'
                        particlesLoaded={particlesLoaded}
                        options={particleOptions}
                    />
                )}
                <div className='BeginContent'>
                    <h2 className='Name'>{LangsData[language].BeginView.Names}</h2>
                    <h1 className='Status'>{LangsData[language].BeginView.Status}</h1>
                    <h2 className='Welcome'>{LangsData[language].BeginView.Welcome}</h2>
                </div>

                <div className='socialLinks'>
                    <hr />
                    <a target='_blank' rel='noopener noreferrer' href="https://www.instagram.com/redda_ar/">Instagram</a>
                    <div></div>
                    <a target='_blank' rel='noopener noreferrer' href="https://www.linkedin.com/in/reddaarg/">LinkedIn</a>
                    <hr />
                </div>

            </section>
            <section className='ProfileView' id='ProfileView'>
                <div className='ArrowDiv'>
                    <img className="Arrow" src={arrowBegin} alt="arrow" />
                </div>
                <div className='ProfileInfo'>
                    <div className='Speech'>
                        <hr />
                        <div>
                            <h3>{LangsData[language].ProfileView.ProfileInfo.Speech.Status}</h3>
                            <ul>
                                <li>{LangsData[language].ProfileView.ProfileInfo.Speech.Degree}</li>
                                <li>{LangsData[language].ProfileView.ProfileInfo.Speech.EnglishLevel}</li>
                                <li>{LangsData[language].ProfileView.ProfileInfo.Speech.Next}</li>
                                <li>{LangsData[language].ProfileView.ProfileInfo.Speech.CV}</li>
                            </ul>
                        </div>
                    </div>
                    <img src={ProfilePicture} alt="ProfilePicture" />
                    <div className='LangsTechs'>
                        <hr />
                        <div>
                            <h3>{LangsData[language].ProfileView.ProfileInfo.LangsTechs.LanguagesTechnologies}</h3>
                            <ul>
                                <li>{LangsData[language].ProfileView.ProfileInfo.LangsTechs.L1}</li>
                                <li>{LangsData[language].ProfileView.ProfileInfo.LangsTechs.L2}</li>
                                <li>{LangsData[language].ProfileView.ProfileInfo.LangsTechs.L3}</li>
                                <li>{LangsData[language].ProfileView.ProfileInfo.LangsTechs.L4}</li>
                                <li>{LangsData[language].ProfileView.ProfileInfo.LangsTechs.L5}</li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div className='CentersOfInterests'>
                    <h2>{LangsData[language].ProfileView.ProfileInfo.COI.Title}</h2>
                    <div className='InterestsCards'>
                        <COI vector={webVector} text={LangsData[language].ProfileView.ProfileInfo.COI.COI1} alt={"WebDesign"} />
                        <COI vector={roboticVector} text={LangsData[language].ProfileView.ProfileInfo.COI.COI2} alt={"Robotic"} />
                        <COI vector={droneVector} text={LangsData[language].ProfileView.ProfileInfo.COI.COI3} alt={"FPVDrone"} />
                        <COI vector={blockchainVector} text={LangsData[language].ProfileView.ProfileInfo.COI.COI4} alt={"Blockchain"} />
                    </div>
                </div>
            </section>
            <section ref={ProjectView} className='ProjectsView' id='ProjectsView'>
                <h1 className='ProjectsSectionTitle'>{LangsData[language].ProjectsView.Title}</h1>
                <div className='Filter'>
                    <button className={filter === 0 ? "selected" : null} onClick={() => { if (!filterLoading) { setFilter(0); setFilterStateTxt(LangsData[language].ProjectsView.Filter.all); }; correctProjectsView(); }}>{LangsData[language].ProjectsView.Filter.all}</button>
                    <button className={filter === 1 ? "selected" : null} onClick={() => { if (!filterLoading) { setFilter(1); setFilterStateTxt(LangsData[language].ProjectsView.Filter.web); }; correctProjectsView(); }}>{LangsData[language].ProjectsView.Filter.web}</button>
                    <button className={filter === 2 ? "selected" : null} onClick={() => { if (!filterLoading) { setFilter(2); setFilterStateTxt(LangsData[language].ProjectsView.Filter.robotic); }; correctProjectsView(); }}>{LangsData[language].ProjectsView.Filter.robotic}</button>
                    <button className={filter === 3 ? "selected" : null} onClick={() => { if (!filterLoading) { setFilter(3); setFilterStateTxt(LangsData[language].ProjectsView.Filter.blockchain); }; correctProjectsView(); }}>{LangsData[language].ProjectsView.Filter.blockchain}</button>
                </div>
                <hr />
                <div className="RenderedProjects">
                    <div className='SliderButtonsDiv'>
                        <button className={arrowStart ? "ArrowStart" : null} onClick={() => { scrollLeft(); correctProjectsView(); }}><img src={arrow} alt="arrow1" /></button>
                        <button className={arrowEnd ? "ArrowEnd" : null} onClick={() => { scrollRight(); correctProjectsView(); }}><img src={arrow} alt="arrow2" /></button>
                    </div>

                    <div className={filterLoading ? "Slider inLoading" : "Slider"} ref={sliderRef}>

                        <div className={filterLoading ? "Slide inLoading" : "Slide"}>
                            {
                                filteredProjects.length > 0 ?
                                    ProjectsList.map((project, index) => (
                                        <Project
                                            key={index}
                                            mainTitle={project.mainTitle && project.mainTitle.length > 0 ? project.mainTitle : ""}
                                            displayedProject={filteredProjects.some(displayedProject => displayedProject.type === project.type)}
                                            mediaFile={project.mediaFile && project.mediaFile.length > 0 ? project.mediaFile : ""}
                                            title={project.data && project.data.length > 0 ? project.data[language].title : ""}
                                            usedTechs={project.data && project.data.length > 0 ? project.data[language].usedTechs : ""}
                                            description={project.data && project.data.length > 0 ? project.data[language].description : ""}
                                            links={project.links && project.links.length > 0 ? project.links : []}
                                        />
                                    ))
                                    :
                                    <h1>{LangsData[language].ProjectsView.noProjects.noProjects1} {filterStateTxt} {LangsData[language].ProjectsView.noProjects.noProjects2}</h1>
                            }
                        </div>
                    </div>


                </div>
                <hr />
            </section>
            <section className='ContactView' id='ContactView'>
                <h1 className='ContactSectionTitle'>{LangsData[language].ContactView.Title}</h1>
                <form ref={form} onSubmit={sendEmail}>
                    <div>
                        <label htmlFor="name">{LangsData[language].ContactView.Form.Name}</label>
                        <input type="text" name="name" id='name' autoComplete='name' required maxLength={20} />
                    </div>
                    <div>
                        <label htmlFor="email">{LangsData[language].ContactView.Form.Email}</label>
                        <input type="email" name="email" id='email' autoComplete='email' required maxLength={35} />
                    </div>
                    <div>
                        <label htmlFor="message">{LangsData[language].ContactView.Form.Message}</label>
                        <textarea name="message" id='message' autoComplete='message' required maxLength={500} />
                    </div>
                    <button>{LangsData[language].ContactView.Form.Send}</button>
                </form>
            </section>
        </div>

    );
}

export default PrincipalPage;
