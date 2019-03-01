import React, { Component } from 'react';
import { Consumer } from '../../../context';
import Spinner from '../../shared/Spinner';
import Show from './Show';

class Shows extends Component {
    render() {
        return (
            <Consumer>
                {value => {
                    const  { show_list }  = value;

                    if (show_list === undefined || show_list.length === 0) {
                        return <Spinner />;
                    } else {
                        return (
                            <React.Fragment>
                                <div>
                                {show_list.map(item => (
                                    <Show key={ item.title } show={ item } />
                                ))}
                                </div>
                            </React.Fragment>
                        );
                    }
                }}
            </Consumer>
        )
    }
};

export default Shows;
