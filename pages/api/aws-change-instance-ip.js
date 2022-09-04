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
    var allocateParams = {
        Domain: "vpc"
    };
    ec2.allocateAddress(allocateParams, function (err, data) {
        if (err) {
            res.status(500).send({
                error: err
            });
        }
        else {
            var newAllocationId = data.AllocationId;
            var associateParams = {
                AllocationId: newAllocationId,
                InstanceId: req.body.instanceId,
            };
            ec2.associateAddress(associateParams, function (err, data) {
                if (err) {
                    res.status(500).send({
                        error: err
                    });
                }
                else {
                    var disassociateParams = {
                        AssociationId: data.AssociationId
                    };
                    ec2.disassociateAddress(disassociateParams, function (err, data) {
                        if (err) {
                            res.status(500).send({
                                error: err
                            });
                        }
                        else {
                            var releaseParams = {
                                AllocationId: newAllocationId
                            };
                            ec2.releaseAddress(releaseParams, function(err, data) {
                                if (err) {
                                    res.status(500).send({
                                        error: err
                                    });
                                }
                                else {
                                    res.status(200).send({});
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}