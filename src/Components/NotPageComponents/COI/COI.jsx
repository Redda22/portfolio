import React from 'react';
import './COI.scss';

// Centers Of Interests
function COI({ vector, text, alt }) {
    



    return (
        <div className='COI'>
            <img src={vector} alt={alt} />
            <h4>{text}</h4>
        </div>
    );
}

export default COI;
