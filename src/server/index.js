require('dotenv').config();
let path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const apiKey = process.env.API_KEY;
const axios = require('axios');
const cors = require("cors");
const bodyParser = require('body-parser');
// import * as dotenv from 'dotenv';
// dotenv.config();
// import path from 'path';
// import express from 'express'
// import axios from 'axios';
// import cors from "cors";
const app = express();
app.use(cors());
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// const middleware = require('webpack-dev-middleware');
// app.use(middleware(compiler, {
//     webpack-dev-middleware options
// }));
app.get('*', (req, res) => {
    res.sendFile((path.resolve('src/client/views/index.html')));
});
app.post('/test', async (req, res) => {
    console.log(req);
    const url = req.body.sentLink;
    console.log(url);
    try {
        const requestUrl = generateUrlFromUrl(url);
        const jsonData = await getData(requestUrl).catch((e) => {
            console.log("get-apod error " + e);
            res.status(500).send()
        });
        res.send(jsonData)
    } catch (e) {
        console.error(e);
        res.status(500).send(e)
    }

});

// designates what port the app will listen to for incoming requests
app.listen(8080, () => {
    console.log('Example app listening on port 8080!')
});




async function getData(url) {

    return await axios.get(url)
        .then(response => {
            if (response.status === 200) {
                return response.data;
            } else {
                console.error(response.status);
                return Promise.reject(response.status)
            }
        })
        .catch(error => {
            console.error(error);
            return Promise.reject(error)
        });

}

function generateUrl(text) {
    const encodedText = encodeURI(text);
    let queryType = 'txt';
    if (text.toString().includes('http')) {
        queryType = 'url';
    } else if (text.toString().includes('https')) {
        throw new Error('Cannot be https for a artical')
    }
    return `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=en&${queryType}=${encodedText}&model=general`
}

function generateUrlFromUrl(url) {
    // url = encodeURI(url);
    return `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=en&url=${url}&model=general&of=json`
}