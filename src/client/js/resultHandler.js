function expandableById(elementId) {
    const dataElement = document.getElementById(elementId.toString());
    const isHidden = dataElement.style.display.toString().includes("none");
    const toggleStr = !isHidden ? "none" : "block"; //custom code loaded from utils // this is a if else technical
    dataElement.style.display = toggleStr;
}
function clickToCopyAction(elementId) {
    try {
        /* Get the text field */
        let copyText = document.getElementById(elementId);

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand("copy");

        /* Alert the copied text */
        return copyText;
    } catch {
        return "Copied";
    }
}
export {expandableById, clickToCopyAction }