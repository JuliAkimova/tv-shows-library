import Season from './Season';
import React  from 'react';

const SeasonList = ({ show }) => {
    return (
        <div className='subitems-container'>
            <div className='subitems'>
                {show.seasons.map(item => (
                    <Season
                        key={item.number}
                        season={item}
                        show={show} 
                    />
                ))}
            </div>
        </div>    
    )
};

export default SeasonList;



