const { handleGenerateUrl, handleRedirect, handleAnalytics, handleUrlData } = require("./url.controller")
const express = require('express')

const urlRouter = express.Router()

urlRouter.post("/url",handleGenerateUrl)

urlRouter.get("/:shortId",handleRedirect)

urlRouter.get('/analytics/:shortId',handleAnalytics)

module.exports = urlRouter