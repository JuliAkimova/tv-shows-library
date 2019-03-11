import React from 'react';
import { Link } from 'react-router-dom';

const Episode = ({ episode, season }) => {
    return (
        <div className='subitem'>
            <div className='content'>
                <Link to={`season_${season.number}/episode_${episode.number}`}>
                        <div className='content-overlay'></div>
                        <img
                            src={ episode.featuredImage.square }
                            alt={`season ${episode.number}`}
                            className='content-image'
                        /> 
                        <div className='content-details fadeIn-bottom'>
                            <h3 className='content-title'>{ `episode ${episode.number}` }</h3>
                            <p className='content-text'>Learn more...</p>
                        </div>
                    </Link>
            </div>
        </div>
    )
};

export default Episode;
