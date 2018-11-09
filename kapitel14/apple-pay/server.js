const restify = require('restify');
const https = require('https');
const fs = require('fs');
const url = require('url');
const cors = require('restify-cors-middleware');

const cert = fs.readFileSync('./merchant_id.pem');
const key = fs.readFileSync('./key.pem');

const server = restify.createServer();
server.use(restify.plugins.bodyParser());

const c = cors({ origins: ['*'] });
server.pre(c.preflight);
server.use(c.actual);

server.post('/', (req, res, next) => {
    const body = JSON.stringify({
        "merchantIdentifier": " --- UPDATE ME --- ",
        "domainName": " --- UPDATE ME --- ",
        "displayName": " --- UPDATE ME --- "
    });
    const request = https.request({
        cert,
        key,
        ...url.parse(req.body),
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(body)
        }
    }, r => {
        const body = [];

        r.on('data', data => {
            body.push(data);
        });

        r.on('end', () => {
            res.send(JSON.parse(Buffer.concat(body).toString()));
            return next();
        })
    });
    request.end(body);
});

server.listen(process.env.PORT || 9000);
