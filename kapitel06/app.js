document.querySelector('button').addEventListener('click', () => {
    alert('hi!')
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
}