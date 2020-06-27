let btns = document.getElementsByName('button');

btns.forEach(btn => {
    btn.onclick = function() {
        alert(btn.id);    
    }
});

function reply_click(id){
    alert(id);
}