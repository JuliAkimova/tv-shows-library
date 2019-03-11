const episodeTemplate = require('./episode-template');

module.exports = (item) => {
    return {
        name: item.name,
        number: item.number,
        relatedShow: item.relatedShow,
        longDescription: item.longDescription,
        shortDescrition: item.shortDescrition,
        featuredImage: {
            square: `http://127.0.0.1:3000/uploads/${item.featuredImage.square}`,
            wide: `http://127.0.0.1:3000/uploads/${item.featuredImage.wide}`,
            extraWide: `http://127.0.0.1:3000/uploads/${item.featuredImage.extraWide}`
        },
        videoFragmentURL: item.videoFragmentURL,
        rating: item.rating,
        episodes:
            item.episodes.map(e => episodeTemplate(e))
    }    
};

