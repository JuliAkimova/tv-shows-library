import React from 'react';
import Episode from './Episode';

const EpisodeList = ({ season }) => {
    return (
        <React.Fragment>
            {season.episodes.map(item => (
                <Episode
                    key={item.number}
                    episode={item}
                    season={season}
                />
            ))}
        </React.Fragment>  
    )
};

export default EpisodeList;
