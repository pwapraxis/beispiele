const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const webpush = require('web-push');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const publicKey = 'BBJOV1XgQBuMXIVerURwLUFlfYcxq8_6n2khevCuF-1yBC-r3ONHqPXKj469XsW3U73KXjfitdTnaqgt0V5rXLc';
const privateKey = 'DmnNyu9wkJXv3IUqznyihwx6FBXb0WuQtjVKBqGo3U0';
webpush.setVapidDetails('https://liebel.io', publicKey, privateKey);

const subscriptions = [];

app.post('/subscriptions', (req, res) => {
    subscriptions.push(req.body);
    res.sendStatus(201);
});

app.post('/sendToAll', (req, res) => {
    Promise.all(subscriptions.map(subscription => webpush.sendNotification(subscription, JSON.stringify(req.body))
        .catch(err => {
            if (err.statusCode === 401 || err.statusCode === 404) {
                const subscriptionIndex = subscriptions.indexOf(subscription);
                subscriptions.splice(subscriptionIndex, 1);
            } else {
                console.error(err);
            }
        }))).then(() => res.sendStatus(200));
});

app.listen(8080);
