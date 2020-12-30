
import { checkForName } from './js/nameChecker.js'
import { handleSubmit } from './js/formHandler.js'
import './js/css_files.js';
window.checkForName = checkForName;
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
