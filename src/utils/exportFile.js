



export function exportAsFile (data, name='') {
    const element = document.createElement("a"); // text/plain
    const textFile = new Blob([JSON.stringify(data)], { type: 'application/json' }); //pass data from localStorage API to blob
    element.href = URL.createObjectURL(textFile);
    element.download = name + "File.txt";
    document.body.appendChild(element);
    element.click();
}