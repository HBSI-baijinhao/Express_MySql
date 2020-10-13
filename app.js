const express = require('express');
const app = express();
const cors = require('cors');
// const bodyParser = require('body-parser');
const port = 3000;
const os = require('os');
const path = require("path");
const router = require('./router/index');
const openUrl = require("./public/utils/openUrl");//启动后自动打开浏览器
const uri = `http://${os.networkInterfaces()['以太网'][1].address}:${port}`;
// 
app.use(express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static('uploadFiles'))
app.use('/uploadFiles', express.static(path.join(__dirname, 'uploadFiles')));
// 
const ejs = require("ejs");
app.set("views",path.resolve(__dirname,"./public/views"))
app.set("view engine","ejs");
app.engine(".html", ejs.renderFile); //设置模板渲染
// 
app.use(`/`, router);
app.use(cors)
// app.use(bodyParser.urlencoded({
//    extends: true
// }));

app.listen(port, () => {
   // openUrl(uri);
   console.log(`listening in ${uri}`);
})