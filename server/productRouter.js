const express = require('express');
const productRouter = express.Router();

productRouter.get("/", (req, res) => {
    res.send("Hello")
});

module.exports = productRouter;