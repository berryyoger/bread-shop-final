//header
function headers() {
  const h = document.createElement("header");
  h.innerHTML = `
    <nav>
        <div onclick="location.href='index.html'" class="brand">🥐Bread Shop</div>
        <div class="navA">
            <a href="/bakery.html">Bakery</a>
            <a href="/desserts.html">Desserts</a>
            <a href="/etc.html">E.T.C.</a>
            <a href="/myCart.html">My Cart</a>
            <a href="/contactUs.html">Contact Us</a>
        </div>
        <div class="loginbox">
            <a href="/logIn.html">Log In</a>
            <a href="/signUp.html">Sign Up</a>
        </div>
    </nav>
    `;
  document.body.prepend(h);
}

document.addEventListener("DOMContentLoaded", () => {
  headers();
});

//slide show
const slides = document.querySelectorAll("#slideshow img");
const breadList = [baguette, croissant, PAC, canele, creamCake];
let current = 0;

function slideBrdInfo(bread) {
  let brdName = document.querySelector("#brdName");
  let brdExplain = document.querySelector("#brdExplain");

  brdName.innerText = bread.name;
  brdExplain.innerText = bread.onPage;
}

function showNextSlide() {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
  slideBrdInfo(breadList[current]);
}

function showPastSlide() {
  slides[current].classList.remove("active");
  if (current != 0) {
    current = (current - 1) % slides.length;
    slides[current].classList.add("active");
    slideBrdInfo(breadList[current]);
  } else {
    //current=0
    current = current + slides.length - 1;
    slides[current].classList.add("active");
    slideBrdInfo(breadList[current]);
  }
}

slideBrdInfo(baguette);
setInterval(showNextSlide, 5000);
