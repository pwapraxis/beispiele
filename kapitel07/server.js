const moment = require('moment');
const opn = require('opn');
const express = require('express');
const app = express();

const timelineEntries = [];
const possibleMessages = [
	'Look at this funny cat!',
	'Eine Katze aß dieses Gemüse. Was dann geschah, ahnte niemand.',
	'Wenn du diesen Post dreimal teilst, wird deine ICQ-Blume blau.',
	'Im Südwesten nichts neues.',
	'Diese Sonnenbrillen sind unschlagbar günstig.',
	'Viel Geld sparen mit diesem einfachen Trick.'
];
const possibleImages = [
	'sun.jpg',
	'rain.jpg'
];

app.use(express.static('src'));

app.get('/timeline', (req, res) => {
	const randomMessageIndex = Math.round(Math.random() * (possibleMessages.length - 1));
	const randomImageIndex = Math.round(Math.random() * (possibleImages.length - 1));

	timelineEntries.unshift({
		text: possibleMessages[randomMessageIndex],
		imageUrl: possibleImages[randomImageIndex],
		created: moment().format('DD.MM.YYYY HH:mm:ss')
	});

	res.status(200).send(timelineEntries);
});

const port = 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
	opn('http://localhost:3000');
});
