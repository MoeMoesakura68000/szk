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
    var ec2 = new AWS.EC2();
    var params = {}
    ec2.describeInstances(params, function (err, data) {
        if (err) {
            res.status(500).send({
                error: err
            });
        }
        else {
            var processedInstances = [];
            data.Reservations.forEach(reservation => {
                reservation.Instances.forEach(instance => {
                    processedInstances.push({ id: instance.InstanceId, state: instance.State.Code, type: instance.InstanceType, ip: instance.PublicIpAddress, platform: instance.PlatformDetails })
                })
            });
            res.status(200).send({ instances: processedInstances });
        }
    });
}