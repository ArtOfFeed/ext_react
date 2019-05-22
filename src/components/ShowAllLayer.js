import React from 'react';

function ShowAllLayer(props) {
    let { link } = props;
    return (
        <div className="show_all">
            <a target="_blank" rel="noopener noreferrer" className="link" href={link}>Посмотреть все</a>
        </div>
    );
}

export default ShowAllLayer;