import { Consumer } from '../../context';
import React from 'react';

const EpisodePage = ({ match, value }) => {
    const { show_list } = value;
    const episode = 
        show_list.find(({ title }) => title === match.params.showTitle)
        .seasons.find(({ number }) => number === parseInt(match.params.seasonNumber.split('_')[1]))
        .episodes.find(({ number }) => number === parseInt(match.params.episodeNumber.split('_')[1]));

    return (
        <div>
            <h2>{episode.name}</h2>
            <h4>{episode.number}</h4>
            <img
                src={episode.featuredImage.wide}
                alt='Poster'
            />
        </div>
    )
};

// Get global state and pass it as a props to the child component
const Data = (props) => (
    <Consumer>
        {value => {
            if (value === undefined || value.length === 0) {
                return;
            } else {
                return (
                    <EpisodePage {...props} value={value} />
                )
            }    
        }}
    </Consumer>
);

export default Data;  
