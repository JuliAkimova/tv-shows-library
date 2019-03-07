import React from 'react';
import { Link } from 'react-router-dom';

const Season = ({ season, show }) => {
    return (
        <div>
            <div>
                <h2>{season.name}</h2>
                <h2>{season.number}</h2>
            </div>
            <div>
                <Link 
                    to={`${show.title}/season_${season.number}`}> 
                    <img
                        src={ season.featuredImage.square }
                        alt='Poster'
                    />
                </Link>
            </div>
        </div>
    )
};

export default Season;
