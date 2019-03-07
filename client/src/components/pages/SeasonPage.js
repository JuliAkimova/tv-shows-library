import { Consumer } from '../../context';
import React from 'react';
import EpisodeList from './EpisodeList';

const SeasonPage = ({ match, value }) =>{
    const { show_list } = value;
    const season = 
        show_list.find(({ title }) => title === match.params.showTitle)
        .seasons.find(({ number }) =>  number === parseInt(match.params.seasonNumber.split('_')[1]));

    return (
        <div>
            <h2>{season.name}</h2>
            <h4>{season.number}</h4>
            <img
                src={season.featuredImage.extraWide}
                alt='Poster'
            />
            <EpisodeList season={season}/>
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
                    <SeasonPage {...props} value={value} />
                )
            }    
        }}
    </Consumer>
);

export default Data;  


