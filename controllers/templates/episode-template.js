module.exports = (item) => {
    return {
        name: item.name,
        number: item.number,
        relatedShow: item.relatedShow,
        relatedSeason: item.relatedSeason,
        longDescription: item.longDescription,
        shortDescription: item.shortDescription,
        featuredImage: {
            square: `http://127.0.0.1:3000/uploads/${item.featuredImage.square}`,
			wide: `http://127.0.0.1:3000/uploads/${item.featuredImage.wide}`,
			extraWide: `http://127.0.0.1:3000/uploads/${item.featuredImage.extraWide}`
        },
        videoFragmentURL: item.videoFragmentURL,
        rating: item.rating
    }
};

