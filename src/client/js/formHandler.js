import {checkForName} from "./nameChecker.js";

const SERVER = 'http://localhost:8080';

function defaultFetchOpts() {
    return {
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': SERVER,
        },
    }
}

function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    checkForName(formText);
    const urlText = document.getElementById('url').value;
    const data = {
        url: urlText,
    };
    console.log("::: Form Submitted :::");
    new Promise(async resolve => {
        // POST request to `${SERVER}/api/races/${id}/accelerate`
        // options parameter provided as defaultFetchOpts
        // no body or datatype needed for this request
        await fetch(`${SERVER}/test`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {...defaultFetchOpts()}
        })
            .then(async res => await res.json())
            .then(json => console.log(json))
            .then((json) => {
                document.getElementById('results').innerHTML = JSON.stringify(json);
            }).catch((e)=> Promise.reject(e))
    }).catch((e)=> Promise.reject(e))
}

export {handleSubmit}
