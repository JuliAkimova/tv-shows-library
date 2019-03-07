import Season from './Season';
import React  from 'react'

const SeasonList = ({ show }) => {
    return (
        <React.Fragment>
            {show.seasons.map(item => (
                <Season
                    key={item.number}
                    season={item}
                    show={show} 
                />
            ))}
        </React.Fragment>    
    )
};

export default SeasonList;



