import React from 'react';
import './Header.scss';
import '../../../config/colors.scss';
import LangsData from '../../../config/Langs/Langs.json';
import { useRecoilState } from 'recoil';
import { languageState } from '../../../config/RecoilStates/languageState';
import { isLoadingState } from '../../../config/RecoilStates/isLoadingState';

function Header() {
  const [language, setLanguage] = useRecoilState(languageState);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const handleChangeLanguage = (newLanguage) => {
    loadingLanguage(newLanguage);
  };

  async function loadingLanguage(newLanguage) {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 400));
    setLanguage(newLanguage);
    setIsLoading(false);
}

  return (
    <div className="Header">
      <div className='HeaderDivision'>
        <h1>{LangsData[language].Header.HeaderName}</h1>
      </div>
      <div className='HeaderDivision'>
        <ul className='HeaderMenu'>
          <li><a href="#ProfileView">{LangsData[language].Header.Menu.Profile}</a></li>
          <li><a href="#ProjectsView">{LangsData[language].Header.Menu.Projects}</a></li>
          <li><a href="#ContactView">{LangsData[language].Header.Menu.Contact}</a></li>
        </ul>
      </div>
      <div className='HeaderDivision'>
        <ul className='Langs'>
          {
            LangsData.map((LangsData, index) => (
              <li onClick={() => handleChangeLanguage(LangsData.id)} className={language === LangsData.id ? "SelectedLanguage" : null} key={index}>
                {LangsData.LangAcronym}
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default Header;
