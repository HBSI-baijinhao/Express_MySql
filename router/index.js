const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.redirect('/index.html');
  return
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


module.exports = router;
