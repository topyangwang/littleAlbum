/**
 * Created by yangwang on 17/6/20.
 */
var file=require("../models/file.js");
var formidable=require("formidable");
var path = require("path");
var fs=require("fs");
exports.showIndex=function(req,res){
    file.getAllAlbum(function(err,AllAlbums){
        if(err){
            res.send(err);
            return;
        }
        res.render("index",{
            albums:AllAlbums
        })
    })
};
exports.showAlbum=function(req,res,next){
    var albumName=req.params.albumName;
    file.getAllImagesByAlbumName(albumName,function(err,allImges){
        if(err){
            next();
            return;
        }
        res.render("album",{
            "albumName":albumName,
            "images":allImges
        })
    });
    
};
exports.showUp = function(req,res){
    file.getAllAlbum(function(err,album){
        res.render("up",{
            "albums":album
        })
    });

};

exports.doPost = function(req,res){
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + "/../tempup/");
    form.parse(req, function(err, fields, files) {
        if(err){
            next();
            return;
        }
        console.log(files)
        var name=new Date().getTime();
        var oldpath=files.picture.path;
        var newpath= path.normalize(__dirname + "/../uploads/"+fields.wenjianjia+"/"+name+files.picture.name);
        fs.rename(oldpath,newpath,function(err){
            if(err){
                res.send("改名失败");
                return;
            }
            res.send("成功")
        });
    });

};