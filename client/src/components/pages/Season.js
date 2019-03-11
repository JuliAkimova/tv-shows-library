import React from 'react';
import { Link } from 'react-router-dom';

const Season = ({ season, show }) => {
    return (
        <div className='subitem'>
            <div className='content'>
                <Link 
                    to={`${show.title}/season_${season.number}`}> 
                    <div className='content-overlay'></div>
                    <img
                        src={ season.featuredImage.square }
                        alt={`season ${season.number}`}
                        className='content-image'
                    /> 
                    <div className='content-details fadeIn-bottom'>
                        <h3 className='content-title'>{ `season ${season.number}` }</h3>
                        <p className='content-text'>Learn more...</p>
                    </div>
                </Link>
            </div>
        </div>
    )
};

export default Season;
