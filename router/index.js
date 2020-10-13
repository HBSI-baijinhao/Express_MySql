const express = require("express");
const app = express();
const router = express.Router();
const fs = require("fs");
delete require.cache[require.resolve('../public/utils/uploads/fileuploads.js')];
const upload = require("../public/utils/uploads/fileuploads.js");
router.get("/", (req, res) => {
  //   console.log("req", req);
  res.end();
  return;
  res.json({
    code: 200,
    data: [
      {
        name: "芒果全屏影视会员季卡",
        price: "600",
        purchaseNum: 30,
        orderTime: "2020.08.19 10:38",
        status: 3,
        orderNum: "32166464564646",
      },
    ],
  });
});
//首页渲染
router.get("/index", (req, res) => {
  res.render("index");
});
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
//文件上传
router.post("/uploadfiles", upload.single("file"), function (req, res, next) {
  if (req.file) {
    let filePath ='/uploadFiles/'+req.file.filename
    res.send({ data: { filePath: filePath }, code: 200, msg: "文件上传成功" });
  } else {
    res.send({ code: 400, msg: "参数出错" });
  }
});
router.post("/uploadsFilelists", upload.array("file"), function (req, res, next) {
  console.log(req.files)

  if (req.files) {
    let filePath = []
    req.files.forEach((item) => {
      filePath.push(`/uploadFiles/${item.filename}`)
    })
    res.send({ data: filePath, code: 200, msg: "文件上传成功" });
  } else {
    res.send({ code: 400, msg: "参数出错" });
  }
});
module.exports = router;
