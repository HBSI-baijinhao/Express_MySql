/**
 *
 * @Description 文件上传配置
 * @Author Amor
 * @Created 2016/04/27 17:50
 * 技术只是解决问题的选择,而不是解决问题的根本...
 * 我是Amor,为发骚而生!
 *
 */
var multer = require('multer');
var md5 = require('md5');
var config = require('./config')
var savePath = []
var storage = multer.diskStorage({
    //设置上传文件路径,以后可以扩展成上传至七牛,文件服务器等等
    //Note:如果你传递的是一个函数，你负责创建文件夹，如果你传递的是一个字符串，multer会自动创建
    destination: config.upload.path,
    //TODO:文件区分目录存放
    //获取文件MD5，重命名，添加后缀,文件重复会直接覆盖
    filename: function (req, file, cb) {
    // console.log("file", file)
        var fileFormat =(file.originalname).split(".");
        // console.log("fileFormat", fileFormat)
        var filename =md5(fileFormat[0]) + "." + fileFormat[fileFormat.length - 1]
        savePath.push('/uploadFiles/'+filename)
        cb(null, filename);
    },
    
});

//添加配置文件到muler对象。
var upload = multer({
    storage: storage,
    
    //其他设置请参考multer的limits
    //limits:{}
});
upload.getfilepath= function(){
    console.log("upload.getfilepath -> savePath", savePath)
    return savePath
}
//导出对象
module.exports = upload;