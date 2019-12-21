import React from 'react';
import { withRouter } from 'react-router-dom';

import './menu-item.styles.sass';

const MenuItem = ({ title, imageUrl, size, linkUrl, history, match: { url } }) => {    
    return (
        <div className={`${size} menu-item`}
            onClick={() => history.push(`${url}${linkUrl}`)}
        >
            <div
                style={{ 
                    backgroundImage: `url(${imageUrl})`
                }} 
                className="background-image" />
            <div className="content">
                <h1 className="title">{ title.toUpperCase() }</h1>
                <span className="subtitle">SHOP NOW</span>
            </div>
        </div>
    )
};

export default withRouter(MenuItem);