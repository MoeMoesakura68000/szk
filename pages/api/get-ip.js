var http = require('http');
var proxyAgent = require('proxy-agent');

export default function handler(req, res) {
    var opts = {
        host: 'api.ipify.org',
        port: 80,
        path: '/'
    };
    if (req.body.useProxy) {
        opts['agent'] = proxyAgent(req.body.proxy);
    }
    http.get(opts, (getIpRes) => {
        getIpRes.on('data', (ip) => {
            res.status(200).send({ ip: ip.toString() });
        })
    });
}