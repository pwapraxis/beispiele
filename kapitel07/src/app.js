// WARNING: This no production-ready code!

const timelineElm = document.querySelector('#timeline');
document.querySelector('button').addEventListener('click', () => {
	fetch('/timeline')
		.then(response => response.json())
		.then(timeline => createTimeline(timeline))
		.catch(() => timelineElm.innerText = 'Error while fetching timeline, are you offline?');
});

function createTimeline(timeline) {
	timelineElm.innerHTML = '';
	timeline.forEach(timelineEntry => {
		const elm = document.createElement('div');

		const imgElm = document.createElement('img');
		imgElm.src = timelineEntry.imageUrl;
		elm.append(imgElm);

		const quoteElm = document.createElement('blockquote');
		quoteElm.innerText = timelineEntry.text;
		elm.append(quoteElm);

		const dateElm = document.createElement('span');
		dateElm.innerText = timelineEntry.created;
		elm.append(dateElm);

		timelineElm.append(elm);
	});
}

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js');
}