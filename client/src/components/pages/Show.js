import React from 'react';
import { Link } from 'react-router-dom';

const Show = ({ show }) => {
    return (
        <div className='show-item'>
            <div className='show-box'>
                <div className='content'>
                    <Link to= {`show/${show.title}`}>
                        <div className='content-overlay'></div>
                            <img
                                src={ show.posterImage.square }
                                alt={ show.title } 
                                className='content-image'
                            />
                            <div className='content-details fadeIn-bottom'>
                                <h3 className='content-title'>{ show.title }</h3>
                                <p className='content-text'>Learn more...</p>
                            </div>
                    </Link>    
                </div>
            </div>   
        </div>
    )
};

export default Show;
