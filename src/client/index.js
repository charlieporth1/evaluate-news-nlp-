import './js/css_files.js';
import {expandableById, clickToCopyAction} from './js/resultHandler.js'
import { checkForName } from './js/nameChecker.js'
import { handleSubmit, generateHTML } from './js/formHandler.js'

window.expandableById = expandableById;
window.clickToCopyAction = clickToCopyAction;
window.checkForName = checkForName;
window.generateHTML = generateHTML;
window.handleSubmit = handleSubmit;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/index.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
