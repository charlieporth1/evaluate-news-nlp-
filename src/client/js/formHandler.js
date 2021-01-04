import {checkForName} from "./nameChecker.js";
// import marked from 'marked';
// const renderer = new marked.Renderer();
// renderer.html = (mixedContent) => mixedContent.replace(/\n\n[^<>]+?\n\n(?=<)/g, (match) => {
//     const tokens = marked.lexer(match);
//     return marked.parser(tokens);
// });
const SERVER = 'http://localhost:3000';

function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    checkForName(formText);
    const urlText = document.getElementById('url').value.toString();
    // POST request to `${SERVER}/api/races/${id}/accelerate`
    // options parameter provided as defaultFetchOpts
    // no body or datatype needed for this request
    fetch(`${SERVER}/test`, {
        method: 'post',
        body: JSON.stringify({
            sentLink: urlText,
        }),
        headers: {'Content-Type': 'application/json'}
    })
        .then(async res => await res.json())
        .then(json => {
            console.log(json);
            document.getElementById('results').innerHTML = generateHTML(json);
        }).catch((e) => Promise.reject(e))
}

function generateHTML(json) {
    return `
        <table>
         <tr>
         <th>Data</th>
         <th>Result</th>
          </tr>
       
           <tr>
        <td>Confidence</td>
        <td>${json.confidence}</td>
        </tr>
        
         <tr>
        <td>Agreement</td>
        <td>${json.agreement}</td>
        </tr>
        <tr>
        <td>Irony</td>
        <td>${json.irony}</td>
        </tr>
        <tr>
        <td>Score Tag</td>
        <td>${json.score_tag}</td>
        </tr>
        <tr>
        <td>Subjectivity</td>
        <td>${json.subjectivity}</td>
        </tr>
        </table>
        <h4 onclick="expandableById('result-json-data')" class="result-h">SHOW RAW JSON</h4>
        <div style="display: none" id="result-json-data">
        ${JSON.stringify(json)}
           <button class="default-button" onclick="clickToCopyAction('result-json-data');">Click to Copy</button>
         </div>
    
     
      
       
`
}
// function addScript(json) {
//     const utilsScript = document.createElement('script');
//     utilsScript.type = 'text/javascript';
//     utilsScript.text += `
//     document.getElementById('result-json-data').innerHTML +=
//     marked(\`\`\`\`\`\`)
//     `;
//     document.head.appendChild(utilsScript);
// }
export {handleSubmit, generateHTML}
