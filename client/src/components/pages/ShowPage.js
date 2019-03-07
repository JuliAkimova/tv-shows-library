import { Consumer } from '../../context';
import React from 'react';
import SeasonList from './SeasonList';
import '../../styles/page.scss';

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
            <h2>{show.title}</h2>
            <h4>{show.priority}</h4>
            <div className='items'>
                <SeasonList show={show} />
            </div>
                             
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


