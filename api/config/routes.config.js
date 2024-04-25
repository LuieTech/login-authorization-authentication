const express = require("express");
const router = express.Router();

router.get("/patata", (req, res, next) => {
  res.send(
    {
      name: "Henry"
    }
  )
})

module.exports = router;
