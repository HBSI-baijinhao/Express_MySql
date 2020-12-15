const express = require("express");
const router = express.Router();
const fs = require("fs");
delete require.cache[require.resolve('../public/utils/uploads/fileuploads.js')];
const upload = require("../public/utils/uploads/fileuploads.js");

//文件下载
router.get("/download", function (req, res, next) {
    var name = "test.txt";
    var path = "./downloadFiles/" + name;
    var size = fs.statSync(path).size;
    var f = fs.createReadStream(path);
    res.writeHead(200, {
        "Content-Type": "application/force-download",
        "Content-Disposition": "attachment; filename=" + name,
        "Content-Length": size,
    });
    f.pipe(res);
});
//文件上传测试页
router.get("/index", (req, res) => {
    res.render("index");
  });
//文件上传
router.post("/uploadFiles", upload.single("file"), function (req, res, next) {
    if (req.file) {
        let filePath = '/uploadFiles/' + req.file.filename
        res.send({
            data: {
                filePath: filePath
            },
            code: 200,
            msg: "文件上传成功"
        });
    } else {
        res.send({
            code: 400,
            msg: "参数出错"
        });
    }
});
router.post("/uploadsFileLists", upload.array("file"), function (req, res, next) {
    console.log(req.files)

    if (req.files) {
        let filePath = []
        req.files.forEach((item) => {
            filePath.push(`/uploadFiles/${item.filename}`)
        })
        res.send({
            data: filePath,
            code: 200,
            msg: "文件上传成功"
        });
    } else {
        res.send({
            code: 400,
            msg: "参数出错"
        });
    }
});

module.exports = router;