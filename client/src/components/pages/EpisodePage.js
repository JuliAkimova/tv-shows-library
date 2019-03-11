import { Consumer } from '../../context';
import React from 'react';
import ReactPlayer from 'react-player';


const EpisodePage = ({ match, value }) => {
    const { show_list } = value;
    const episode = 
        show_list.find(({ title }) => title === match.params.showTitle)
        .seasons.find(({ number }) => number === parseInt(match.params.seasonNumber.split('_')[1]))
        .episodes.find(({ number }) => number === parseInt(match.params.episodeNumber.split('_')[1]));

    return (
        <div className='page-container'>
           <div className='featured-img'>
                <img
                    src={episode.featuredImage.wide}
                    alt='Poster'
                />
           </div>
           <div className='title'>
               <h2>{episode.name}</h2>
           </div>
           <div className='video-fragment'>
                <ReactPlayer 
                    url={episode.videoFragmentURL}
                    controls
                    playing={false}
                    width='90%'
                />
            </div>
            <div className='description'>{episode.longDescription}</div> 

            
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
