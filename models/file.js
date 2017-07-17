/**
 * Created by yangwang on 17/6/20.
 */
var fs=require("fs");
exports.getAllAlbum=function(callback){
    fs.readdir("./uploads",function(err,files){
        if(err){
            callback("没有找到uploads")
        }
        var allAlbum=[];
        (function iterator(i){
            if(i==files.length){
                callback(err,allAlbum);
                return;
            }
            fs.stat("./uploads/"+files[i],function(err,stats){
                if(err){
                    callback("没有找到"+files[i])
                }
                if(stats.isDirectory()){
                    allAlbum.push(files[i]);
                }
                iterator(i+1);
            })

        })(0);
    })
};
exports.getAllImagesByAlbumName=function(alblumName,callback){
    fs.readdir("./uploads/"+alblumName,function(err,files){
        if(err){
            callback("没有找到"+alblumName);
            return;
        }
        var allImages=[];
        (function iterator(i){
            if(i==files.length){
                callback(err,allImages);
                return;
            }
            fs.stat("./uploads/"+alblumName+"/"+files[i],function(err,stats){
                if(err){
                    callback("没有找到"+files[i],null)
                }
                if(stats.isFile()){
                    allImages.push(files[i]);
                }
                iterator(i+1);
            })

        })(0);
    })
};