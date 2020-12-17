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
    fetch('http://localhost:8080/test', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {...defaultFetchOpts()}
    })
        .then(res => res.json()).then(res => console.log(res.json()))
        .then((res) => {
            document.getElementById('results').innerHTML = JSON.stringify(res);
        });
}

export {handleSubmit}
