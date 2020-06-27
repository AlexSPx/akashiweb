const request = new XMLHttpRequest();
let titleContainer = document.getElementById('list');
document.addEventListener('DOMContentLoaded', laodText);    

function laodText() {
    request.open('GET', 'https://akashi.lukesaltweather.de/api/open/projects', true);

    request.onload = function () {
        var data = JSON.parse(request.responseText);
        pringData(data);
    };
    request.send();
}

function pringData(data) {
    let prData = "";

    for(i = 0; i < data.length; i++){
        prData = `<li><button onclick="getID(this.id)" id="${data[i].title}">${data[i].title}</button></li>`;
        titleContainer.insertAdjacentHTML('beforeend', prData); 
    } 
}

function getID(id){
    document.cookie = `id=${id}`;
}



