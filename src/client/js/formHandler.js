import {checkForName} from "./nameChecker.js";

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
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json()).then(res => console.log(res.json()))
        .then((res) => {
            document.getElementById('results').innerHTML = JSON.stringify(res);
        });
}

export {handleSubmit}
// module.exports = handleSubmit;