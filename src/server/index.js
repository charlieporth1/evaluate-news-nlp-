require('dotenv').config();
let path = require('path');
const https = require('follow-redirects').https;
const fs = require('fs');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const apiKey =  process.env.API_KEY;
const fetch = require('node-fetch');
const axios = require('axios');

const app = express();

app.use(express.static('dist'));
// const rootPath  = __dirname.replace(`${path.sep}server`,"");
// console.log(rootPath);
// app.use(express.static(path.join(rootPath, 'client')));
//
app.get('/',  (req, res) => {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(8080,  () => {
    console.log('Example app listening on port 8080!')
});

app.post('/test', async (req, res) => {

   const url = generateUrlFromUrl(res.url);
    const jsonData = await getData(url).catch((e) => {
        console.log("get-apod error " + e);
        res.status(500).send()
    });
   console.log(jsonData);
    res.send(jsonData)
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
function postData() {
    const body = { a: 1 };

    fetch('https://httpbin.org/post', {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(json => console.log(json));
}
function generateUrl(text) {
    text = encodeURI(text);
    return `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=en&txt=${text}&model=general`
}

function generateUrlFromUrl(url) {
    url = encodeURI(url);
    return `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=en&url=${url}&model=general`
}