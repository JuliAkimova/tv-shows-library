const seasonTemplate = require('./season-template');

module.exports = (item) => {
	return {
		_id: item._id,
		title: item.title,
		subtitle: item.subtitle,
 		dateOfStart: item.dateOfStart,
		posterImage: {
			square: `http://127.0.0.1:3000/uploads/${item.posterImage.square}`,
			wide: `http://127.0.0.1:3000/uploads/${item.posterImage.wide}`,
			extraWide: `http://127.0.0.1:3000/uploads/${item.posterImage.extraWide}`
		},
		longDescription: item.longDescription,
		shortDescription: item.shortDescription,
		priority: item.priority,
		videoFragmentURL: item.videoFragmentURL,
		rating: item.rating,
		seasons: 
			item.seasons.map(s => seasonTemplate(s))
	}
};
