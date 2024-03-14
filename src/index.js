import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
    RecoilRoot
    // atom,
    // selector,
    // useRecoilState,
    // useRecoilValue,
} from 'recoil';

import './index.scss';
import './config/colors.scss';

import PrincipalPage from './Components/PrincipalPage/PrincipalPage';
import ProjectPage from './Components/ProjectPage/ProjectPage.jsx';
import IsLoading from './Components/NotPageComponents/LoadingView/LoadingView.jsx';

import reportWebVitals from './reportWebVitals';


function App() {

    return (
        <BrowserRouter>
            <RecoilRoot>
                <IsLoading/>
                <Routes>
                    <Route path="/" element={<PrincipalPage />} />
                    <Route path='/:mainTitle' element={<ProjectPage/>} />
                    <Route path="404" element={""} />
                    <Route path="*" element={""} />
                </Routes>
            </RecoilRoot>
        </BrowserRouter>
    )
}


ReactDOM.render( <React.StrictMode> <App /> </React.StrictMode>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
