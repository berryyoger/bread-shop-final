//index
function brdImgOver (obj){
    obj.src = "./img/bread.png"
}
function brdImgOut (obj){
    obj.src = "./img/croissont.png"
}//빵 이미지


function f(e){e.preventDefault();}

function f2(e){
    let result = confirm("가격계산 사이트로 연결할까요 ?")
    if(result == false) e.preventDefault();
}

window.onload = function(){
    document.querySelector('#a1').onclick = f;
    document.querySelector('#a2').addEventListener("click",f)
    document.querySelector('#a3').onclick = f2;
}