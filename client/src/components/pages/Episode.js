import React from 'react';
import { Link } from 'react-router-dom'

export default function Episode({ episode, season }) {
    return (
        <div>
            <div>
                <h2>{episode.name}</h2>
                <h2>{episode.number}</h2>
                <Link to={`season_${season.number}/episode_${episode.number}`}> >
                    <img
                        src={episode.featuredImage.square}
                        alt='Poster'
                    />
                </Link>
            </div>
        </div>
    )
}
