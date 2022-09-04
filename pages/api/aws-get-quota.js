var AWS = require('aws-sdk');
var proxyAgent = require('proxy-agent');

export default function handler(req, res) {
    AWS.config = new AWS.Config();
    AWS.config.update(
        {
            accessKeyId: req.body.aki,
            secretAccessKey: req.body.saki,
            region: req.body.region
        }
    );
    if (req.body.useProxy) {
        AWS.config.update({
            httpOptions: { agent: proxyAgent(req.body.proxy) }
        });
    }
    var servicequotas = new AWS.ServiceQuotas();
    var params = {
        QuotaCode: 'L-1216C47A',
        ServiceCode: 'ec2'
    };
    servicequotas.getServiceQuota(params, function (err, data) {
        if (err) {
            res.status(500).send({
                error: err
            });
        }
        else {
            res.status(200).send({
                quota: data.Quota.Value
            });
        }
    });
}