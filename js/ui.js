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


//header
function headers(){
    const h = document.createElement("header")
    h.innerHTML=`
    <nav>
        <div onclick="location.href='index.html'" class="brand">🥐Bread Shop</div>
        <div class="navA">
            <a href="">Bread</a>
            <a href="">cake</a>
            <a href="">cookie</a>
            <a href="">pie</a>
            <a href="">dessert</a>
        </div>
        <div class="loginbox">
            <a href="">Log In</a>
            <a href="">Sign Up</a>
        </div>
    </nav>
    `;
    document.body.prepend(h);
}


document.addEventListener("DOMContentLoaded", ()=>{
    headers()
})

//slide show
const slides = document.querySelectorAll("#slideshow img");
    let current = 0;

    function showNextSlide() {
        slides[current].classList.remove("active");
        current = (current + 1) % slides.length;
        slides[current].classList.add("active");
    }

    function showPastSlide() {
            slides[current].classList.remove("active");
            if(current!=0){
                current = (current - 1) % slides.length;
                slides[current].classList.add("active");
            }
            else{//current=0
                current = current + slides.length - 1
                slides[current].classList.add("active");
            }
    }
setInterval (showNextSlide, 3000);
