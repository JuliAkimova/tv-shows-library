import React from 'react';

const Show = (props) => {
    const { show } = props;
    return (
        <div>
            <div>
                <div>
                    <h2>{ show.title }</h2>
                </div>
                <div>
                    <img
                    src={ show.posterImage.square }
                    alt="Poster"
                    style={{ width: '200px', margin: ' 40px auto', display: 'block' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Show;
