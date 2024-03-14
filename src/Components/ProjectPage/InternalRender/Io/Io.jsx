import React, { useEffect } from 'react';
import './Io.scss';
import Io3d from '../../../../Assets/Videos/Io3d.mp4';
import Io1 from '../../../../Assets/Videos/Io1.mp4';
import Io2 from '../../../../Assets/Videos/Io2.mp4';
import Io3 from '../../../../Assets/Videos/Io3.mp4';
import '../../../../config/colors.scss';
import { useRecoilValue } from 'recoil';
import { languageState } from '../../../../config/RecoilStates/languageState';
import IoTexts from './IoTexts.json';


function Io() {
    const language = useRecoilValue(languageState);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='IoPage'>
            <h1>{IoTexts[language].Data.Title}</h1>
            <video autoPlay loop muted>
                <source src={Io3d} type='video/mp4'/>
            </video>
            <div className='Data'>
                <p className='Status'>{IoTexts[language].Data.Status}</p>
                <div className='Options'>
                    <hr/>
                    <p>{IoTexts[language].Data.Infos.info1}</p>
                    <p>{IoTexts[language].Data.Infos.info2}</p>
                    <p>{IoTexts[language].Data.Infos.info3}</p>
                    <p>{IoTexts[language].Data.Infos.info4}</p>
                    <hr/>
                </div>
                <div className='OldVersions'>
                    <h1>{IoTexts[language].Data.ArchiveTitle}</h1>
                    <div>
                        <video controls muted>
                            <source src={Io1}/>
                        </video>
                        <video controls muted>
                            <source src={Io2}/>
                        </video>
                        <video controls muted>
                            <source src={Io3}/>
                        </video>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Io;