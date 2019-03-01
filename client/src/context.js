import React, { Component } from 'react';

const Context = React.createContext();

export class Provider extends Component {
    state = {
        show_list: []
    };

    componentDidMount() {
        fetch('api/shows')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`res.statusText`);
                }
                return res.json()
        }) 
        
        .then(data => {
            this.setState({ show_list: data.shows });
        }) 
        .catch(err => console.log(err));
    }

    render() {
        return (
            <Context.Provider value={ this.state }>
                { this.props.children }
            </Context.Provider>
        )
    }
};

export const Consumer = Context.Consumer;
