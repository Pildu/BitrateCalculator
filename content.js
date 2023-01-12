const video = document.querySelector('video');
const videoUrl = video.src;

const xhr = new XMLHttpRequest();
xhr.open('HEAD', videoUrl);
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const size = xhr.getResponseHeader('Content-Length');
    const sizeInMb = (size / 1048576).toFixed(2); // convert to MB and keep 2 decimal places
    const duration = video.duration;
    const bitrate = (sizeInMb / duration) * 8;

    const table = document.createElement('table');
    table.style.position = 'fixed';
    table.style.top = '0';
    table.style.right = '0';
    table.style.color = 'black';
    table.style.backgroundColor = 'white';

    const row1 = table.insertRow();
    row1.insertCell().innerHTML = 'Duration: ' + duration;
    row1.insertCell().innerHTML = 'Size: ' + sizeInMb + " MB";
    row1.insertCell().innerHTML = 'Bitrate: ' + bitrate;

    document.body.appendChild(table);
  }
};
xhr.send();

setInterval(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('HEAD', videoUrl);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const size = xhr.getResponseHeader('Content-Length');
        const sizeInMb = (size / 1048576).toFixed(2); // convert to MB and keep 2 decimal places
        const duration = video.duration;
        const bitrate = (sizeInMb / duration) * 8 * 1000;

        // Find the table and update the cells
        const table = document.querySelector('table');
        table.rows[0].cells[0].innerHTML = 'Длительность: ' + duration +" Сек. ";
        table.rows[0].cells[1].innerHTML = 'Размер: ' + sizeInMb + " MB. ";
        table.rows[0].cells[2].innerHTML = 'Битрейт: ' + bitrate.toFixed(0) + " Кб/c. ";
      }
    };
    xhr.send();
}, 2000);
