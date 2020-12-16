const port = 3000;
const uri = `http://127.0.0.1:${port}`;
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
// app.use(cors);//引入跨域中间件1111
const ejs = require("ejs");

// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({
//    extends: true
// }));

//中间件
// app.use(express.static("public"));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.static("uploadFiles"));
app.use("/uploadFiles", express.static(path.join(__dirname, "uploadFiles")));
//模板渲染
app.set("views", path.resolve(__dirname, "./public/views"));
app.set("view engine", "ejs");
app.engine(".html", ejs.renderFile); //设置模板渲染
//引入路由
app.use(`/`, require("./router/index"));
app.use(`/utils`,require("./router/routerUploadsFile"))
app.use(express.static(path.join(__dirname, 'dist')))//引入vue打包后的文件

const openUrl = require("./public/utils/openUrl"); //启动后自动打开浏览器
app.listen(port, () => {
  // openUrl(uri);//node启动时打开url
  console.log(`listening in ${uri}`);
});
