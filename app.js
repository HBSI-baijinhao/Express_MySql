const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const os = require('os');
const router = require('./router/index');
const openUrl = require("./utils/openUrl");//启动后自动打开浏览器
app.use(`/`, router);

// app.use(bodyParser.urlencoded({
//    extends: true
// }));
app.listen(port, () => {
   let uri = `http://${os.networkInterfaces()['以太网'][1].address}:${port}`;
   // openUrl(uri);
   console.log(`listening in ${uri}`);
})