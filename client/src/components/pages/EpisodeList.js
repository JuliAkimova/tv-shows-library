import React from 'react';
import Episode from './Episode';

const EpisodeList = ({ season }) => {
    return (
        <div className='subitems-container'>
            <div className='subitems'>
                {season.episodes.map(item => (
                    <Episode
                        key={item.number}
                        episode={item}
                        season={season}
                    />
                ))}
            </div>
        </div>  
    )
};

export default EpisodeList;
