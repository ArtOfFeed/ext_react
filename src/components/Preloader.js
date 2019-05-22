import React from 'react';
import logoPrice from '../logos/price.svg';

function Preloader() {
    return <div className="wrapper_preload">
        <div className="inner_preload">
            <img src={logoPrice} alt="" />
        </div>
    </div>
}

export default Preloader;