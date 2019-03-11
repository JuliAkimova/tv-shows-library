import { Consumer } from '../../context';
import React from 'react';
import SeasonList from './SeasonList';
import ReactPlayer from 'react-player';

const  ShowPage = ({ match, value }) =>{
    const { show_list } = value;
    const show = show_list.find(({ title }) => title === match.params.showTitle);

    return (
        <div className='page-container'>
            <div className='featured-img'>
                <img
                    src={show.posterImage.wide}
                    alt={show.title}
                /> 
            </div>
            <div className='title'>
                <h2>{show.title}</h2>
            </div>
            <div className='video-fragment'>
                <ReactPlayer 
                    url={show.videoFragmentURL}
                    controls
                    playing={false}
                    width='90%'
                />
            </div>
            <div className='description'>{show.longDescription}</div> 
            <SeasonList show={show} />
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
                    <ShowPage {...props} value={value} />
                )
            }    
        }}
    </Consumer>
);

export default Data;





