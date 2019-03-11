import { Consumer } from '../../context';
import React from 'react';
import EpisodeList from './EpisodeList';
import ReactPlayer from 'react-player';

const SeasonPage = ({ match, value }) =>{
    const { show_list } = value;
    const season = 
        show_list.find(({ title }) => title === match.params.showTitle)
        .seasons.find(({ number }) =>  number === parseInt(match.params.seasonNumber.split('_')[1]));

    return (
        <div className='page-container'>
            <div className='featured-img'>
                <img
                    src={season.featuredImage.extraWide}
                    alt={season.name}
                />
            </div>
            <div className='title'>
                <h2>{season.name}</h2>
            </div>
            <div className='video-fragment'>
                <ReactPlayer 
                    url={season.videoFragmentURL}
                    controls
                    playing={false}
                    width='90%'
                />
            </div>
            <div className='description'>{season.longDescription}</div> 
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


