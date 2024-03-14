import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isLoadingState } from '../../../config/RecoilStates/isLoadingState';

import './LoadingView.scss';

function LoadingView() {

    // eslint-disable-next-line no-unused-vars
    const [isLoading, setIsLoading] = useRecoilState(isLoadingState);

    useEffect(() => {
    }, [isLoading]);

    return (
        <div className={isLoading ? "LoadingView IsLoading" : "LoadingView"} />
    );
}

export default LoadingView;