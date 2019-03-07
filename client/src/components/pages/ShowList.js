import React from 'react';
import { Consumer } from '../../context';
import Spinner from '../shared/Spinner';
import Show from './Show';
import '../../styles/showlist.scss';

const ShowList = () => {
    return (
        <Consumer>
            {value => {
                const  { show_list }  = value;

                if (show_list === undefined || show_list.length === 0) {
                    return <Spinner />;
                } else {
                    return (
                        <div className='show-container'>
                            {show_list.map(item => (
                                <Show 
                                    key={item.title} 
                                    show={item}
                                />
                            ))}
                        </div>
                    );
                }
            }}
        </Consumer>
    )
};

export default ShowList;
