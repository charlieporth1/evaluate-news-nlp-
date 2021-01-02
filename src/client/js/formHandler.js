import {checkForName} from "./nameChecker.js";
// import fetch from 'node-fetch';
const SERVER = 'http://localhost:8080';

function defaultFetchOpts() {
    return {
        // mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': SERVER,
        },
    }
}

function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    checkForName(formText);
    const urlText = document.getElementById('url').value.toString();
    console.log("::: Form Submitted :::");
    // POST request to `${SERVER}/api/races/${id}/accelerate`
    // options parameter provided as defaultFetchOpts
    // no body or datatype needed for this request
    fetch(`${SERVER}/test`, {
        method: 'post',
        body: JSON.stringify({
            sentLink: urlText,
        }),
        headers: {'Content-Type': 'application/json',}
    })
        .then(async res => await res.json())
        .then(json => {
            console.log(json);
            document.getElementById('results').innerHTML = `<p>${JSON.stringify(json)}</p>`;
        }).catch((e) => Promise.reject(e))
}

export {handleSubmit}
