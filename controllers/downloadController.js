'use strict';
var multer = require('multer'),
    multerS3 = require('multer-s3'),
    fs = require('fs'),
    AWS = require('aws-sdk');

AWS.config.loadFromPath('./config/s3_config.json');
var s3 = new AWS.S3();


exports.createBucket = function(req, res) {
    var item = req.body;
    var params = {
        Bucket: item.bucketName
    };
    s3.createBucket(params, function(err, data) {
        if (err) {
            return res.status(200).send({
                "status":success,
                "message":"Unable to create Bucket, Please check credential.",
                "error": err
            });
        }
        res.status(200).send({
            "status":success,
            "res": data
        });
    });
}



exports.getObjects = function(req, res) {
    var item = req.body;
    var params = {
        Bucket: req.params.bucketName
    };
    s3.getObject(params, function(err, data) {
        if (err) {
            return res.send({
                "error": err
            });
        }
        res.send({
            data
        });
    });
}



exports.uploadFile = function(req, res) {
    var item = req.body;
    var upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: item.bucketName,
            metadata: function(req, file, cb) {
                cb(null, {
                    fieldName: file.fieldname
                });
            },
            key: function(req, file, cb) {
                cb(null, Date.now().toString())
            }
        })
    })
}