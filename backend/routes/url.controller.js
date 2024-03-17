const { nanoid } = require('nanoid')
const URL = require('../models/url.mongo')

async function handleGenerateUrl(req, res) {
    const shortID = nanoid(5)
    const body = req.body
    if (!body.url) {
        return res.status(400).json({
            error: "Url is required"
        })
    }
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: []
    })
    res.status(200).json({
        id: shortID
    })
}

async function handleRedirect(req, res) {
    const shortId = req.params.shortId

    const updateEntry = await URL.findOneAndUpdate({shortId},{
        $push:{
            visitHistory:{
                timestamp:Date.now()
            }
        }
    })
    res.redirect(updateEntry?.redirectUrl)
}

async function handleAnalytics(req,res) {
    const shortId = req.params.shortId
    const result =await URL.findOne({shortId})
    return res.status(200).json({
        clicks : result.visitHistory.length,
        analytics : result.visitHistory
    })
} 

async function handleData(req,res) {
    console.log('we need to serve the data')
    const data = await URL.find({})
    console.log(data)
    res.status(200).json({
        data:data
    })
}

module.exports = {
    handleGenerateUrl,
    handleRedirect,
    handleAnalytics,
    handleData
}