import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/show.scss';

const Show = ({ show }) => {
    return (
        <div className='show-item'>
            <div className='show-box'>
                <div>
                    <Link to={`show/${show.title}`}> 
                        <div className='img-box'>
                            <img
                               src={ show.posterImage.square }
                                alt={ show.title} 
                            />
                            <div className='overlay-text'>more info</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Show;
