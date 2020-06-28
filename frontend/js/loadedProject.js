const request = new XMLHttpRequest();
document.addEventListener('DOMContentLoaded', loadPage);

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const cookieID = getCookie("id")


function getChapterID(data) {
    for(i = 0; i < data.length; i++){
        if(data[i].title == cookieID){
             return data[i].id
             
        }
    }
}

function loadPage() {
    request.open('GET', 'https://akashi.nekyou.com/api/open/projects', true)
    
    request.onload = function() {
        var data = JSON.parse(request.responseText);
        const id = getChapterID(data);
        //document.cookie = `cID=${id}`;
        setTitle();
        setThumbnail(data, id);
        loadChapters(id); 
    }
    request.send();
}

function setTitle() {
    document.getElementById('chapterTitle').textContent = cookieID
}

function setThumbnail(data, id) {
    for(i = 0; i < data.length; i++){
        if(data[i].id == id){
            document.getElementById("thumbnail").insertAdjacentHTML('beforeend', 
            `<img src="${data[i].thumbnail}" alt="#">`); 
        }
    }
}

function loadChapters(id) {
    request.open(`GET`, `https://akashi.nekyou.com/api/open/projects/${id}/chapters`);
        request.onload = function() {
            var chapters = JSON.parse(request.responseText);
            printChapters(chapters);
        }
        request.send();
}

function printChapters(chapters) {
    for(i = 0; i < chapters.length; i++){
        let content = `Chapter ${chapters[i].number}`;
        document.getElementById(`buttons`).
        insertAdjacentHTML(`beforeend` ,`<button>${content}</button><br>`);
    }
}
