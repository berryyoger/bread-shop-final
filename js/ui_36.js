//header
function headers() {
  //header를 출력하는 함수.
  const h = document.createElement("header"); //header 태그 생성. (7.10 예제 활용)
  h.innerHTML = `
    <nav>
        <div onclick="location.href='index_36.html'" class="brand">🥐Bread Shop</div>
        <div class="navA">
            <a href="/shop_36.html">상품</a>
            <a href="/purchase_36.html">구매</a>
            <a href="/myCart_36.html">내 장바구니</a>
            <a href="/aboutUs_36.html">회사 소개</a>
            <a href="/contactUs_36.html">문의하기</a>
        </div>
        <div class="loginbox">
            <a href="/logIn_36.html">로그인</a>
            <a href="/signUp_36.html">회원가입</a>
        </div>
    </nav>
    `; //header 태그 내 html 선언.
  document.body.prepend(h); //body 태그의 앞에 header 위치.
}

function footers() {
  //footer를 출력하는 함수.
  const footer = document.createElement("footer"); //footer 태그 생성 (7.10 예제 활용)
  footer.innerHTML = `
    <div class="footerCwuNav" style="overflow: visible">
    <h2>Connect with us</h2>
    <ul class="icons">
        <li style="text-align: left;">
            <a href="https://www.facebook.com/{}" class="link" target="_blank">
                <img src="assets/facebook.svg" alt="Bread Shop on Facebook" >
            </a>
        </li>
        <li style="text-align: left;">
            <a href="https://www.instagram.com/{}" class="link" target="_blank">
                <img src="assets/instagram.svg" alt="Bread Shop on Instagram" >
            </a>
        </li>
        <li style="text-align: left;">
            <a href="https://twitter.com/{}" target="_blank" class="link">
                <img src="assets/twitter.svg" alt="Bread Shop on Twitter" >
            </a>
        </li>
        <li style="text-align: left;">
            <a href="https://www.youtube.com/c/{}" target="_blank" class="link">
                <img src="assets/youtube.svg" alt="Bread Shop on Youtube" >
            </a>
        </li>
    </ul>
    <p>©&thinsp;2025&thinsp;—&thinsp;Bread Shop</p>
</div>
      `; //푸터 태그 내 html 선언.
  document.body.append(footer); //body 태그 뒤에 footer 위치.
}

document.addEventListener("DOMContentLoaded", () => {
  headers();
  footers();
  if (document.querySelector(".shopContainer")) shop(); // shop 페이지에서만 shop() 실행
  if (document.querySelector("#slideshow")) slide(); // 슬라이드가 있을 때만 slide() 실행
});

//slide show (slide show 예제 활용)
let slides = document.querySelectorAll("#slideshow img");
const breadList = [
  baguette,
  croissant,
  PAC,
  canele,
  creamCake,
  cookie,
  scone,
  madeleine,
  financier,
  donut,
  muffin,
  soufflePancake,
  waffle
]; //hover에 상품 설명을 띄우는 로직을 위한 array. 해당 품목은 breadInfo.js에 object로 선언되어있음.
let current = 0; //현재 슬라이드의 번호

function slide() {
  //img를 출력하는 함수.
  for (i = 1; i < breadList.length; i++) {
    const slideImgs = document.createElement("img"); //img 태그 생성
    slideImgs.src = `assets/` + breadList[i - 1].var + `.png`; //생성된 img에 src 부여
    slideImgs.alt = `${breadList[i - 1].var}`; //생성돈 img에 alt 부여
    console.log(slideImgs);
    document.querySelector("#slideshow").append(slideImgs); //3slideshow 안에 맨 마지막에 생성한 img 위치.
  }
  document.querySelector("#slideshow img").classList.add("active");
  slides = document.querySelectorAll("#slideshow img");
}

function slideBrdInfo(bread) {
  //상품 설명을 바꾸는 함수
  let brdName = document.querySelector("#brdName"); //상품명
  let brdExplain = document.querySelector("#brdExplain"); //상품 설명

  brdName.innerText = bread.name; //상품명 inner text 변경
  brdExplain.innerText = bread.onPage; //상품 설명 inner text 변경
}

function showNextSlide() {
  //슬라이드 쇼의 다음 img를 보여주는 함수
  slides[current].classList.remove("active"); //현재 슬라이드의 active class를 삭제.
  current = (current + 1) % slides.length; //다음 슬라이드 번호를 가져오는 로직. 단순 + 1에 나머지를 구하는 %를 활용하여 array의 length 즉, 마지막 슬라이드쇼에 해당하면 0을 반환함.
  slides[current].classList.add("active"); //바뀐 슬리이드(이 순간에는 현재 슬라이드)에 active class 부여.
  slideBrdInfo(breadList[current]); //위에 선언한 삼품 설명을 바꾸는 함수에 현재 슬라이드 번호를 입력. -> 해당하는 상품명, 상품 설명을 띄움.
}

function showPastSlide() {
  //슬라이드 쇼의 이전 img를 보여주는 함수
  slides[current].classList.remove("active"); //현재 슬라이드의 active class를 삭제.
  if (current != 0) {
    //현재 슬라이드쇼가 첫번째가 아닐 때. 위 showNextSlide와 똑같이 작동.
    current = (current - 1) % slides.length;
    slides[current].classList.add("active");
    slideBrdInfo(breadList[current]);
  } else {
    //단순하게 현재 슬라이드에 -1을 하면 현재 슬라이드 번호가 음수가 되면서 오류가 발생하므로 예외처리.
    current = current + slides.length - 1; //현재 슬라이드가 0번이면 슬라이드 array의 길이를 더하고 -1하여 마지막 슬라이드 번호를 반환.
    slides[current].classList.add("active"); //바뀐 슬라이드(이 순간에는 마지막 슬라이드(마지막 번호))에 active class 부여.
    slideBrdInfo(breadList[current]); //위에 선언한 삼품 설명을 바꾸는 함수에 현재 슬라이드 번호를 입력. -> 해당하는 상품명, 상품 설명을 띄움.
  }
}

slideBrdInfo(baguette); //페이지 로드 직후에는 슬라이드 쇼에 상품명/설명이 들어가 있지 않으니 임의로 첫번쨰 상품만 상품명/설명을 입력.
setInterval(showNextSlide, 5000); //5초에 한 번씩 다음 슬라이드를 보여주는 함수를 실행.

//New Bread time (6.1.3 내장객체 중 Date 객체 사용)(6.3예제 활용)
const brdTimeSign = document.querySelector("#brdTime"); //문구가 출력될 div 호출.
function newBreadTime() {
  //문구에 사용될 시간을 계산하는 함수.
  let cTime = new Date(); //Date 호출
  let hour = cTime.getHours(),
    min = cTime.getMinutes();
  sec = cTime.getSeconds(); // 현재 시각, 분, 초 호출

  if (hour > 12) {
    //(12시에 빵이 나온다고 하면, 13,14시 등 12시 이후는 값이 음수가 되니 예외처리.)
    let leftedHour = 35 - hour; //12에 24를 더하는 것이 아닌, 24를 더하고 1을 빼야 분,초와 맞음.
    leftedMin = 59 - min; //남은 분 계산
    leftedSec = 60 - sec; //남은 초 계산
    brdTimeSign.innerText =
      "🥐새로운 빵이 나오기까지" + leftedHour + "시간" + leftedMin + "분" + leftedSec + "초 남았습니다.🍞"; //문구 출력
  } else {
    let leftedHour = 11 - hour; //현재 시간이 00시 이후, 12시 이전일 때. 위와 같이 처리.
    leftedMin = 59 - min;
    leftedSec = 60 - sec;
    brdTimeSign.innerText =
      "🥐새로운 빵이 나오기까지" +
      leftedHour +
      "시간" +
      leftedMin +
      "분" +
      leftedSec +
      "초 남았습니다.🍞";
  }
}
setInterval(newBreadTime, 1000);

//shop.html scripts
function product(bread) {
  //product를 출력하는 함수.breadInfo.js에 있는 상품 object 호출. (7.10 예제 활용)
  const product = document.createElement("div"); //div 태그 생성
  product.classList.add("product"); //생성한 div에 product class 부여
  product.innerHTML =
    `<form action="buy_36.html" method="get">
    <img src="assets/` +
    bread.var +
    `.png" alt="` +
    bread.var +
    `">
    <h1>` +
    bread.name +
    `</h1>
    <h1 class="brdtitle">` +
    bread.title +
    `</h1>
    <div class="costRemain">
      <h2>` +
    bread.cost +
    `won</h2>
      <h3>` +
    bread.remain +
    ` Remains</h3> <input class="buyBtn" type="submit" value="BUY">
    <input name = "bread" value="` +
    bread.var +
    `" style="display:none;">
    </div>
    </form>
      `; //product 태그 내 html 선언. breadInfo.js 내 오브젝트 활용. 파라미터 활용
  document.querySelector(".shopContainer").prepend(product); //body 태그 뒤에 product 위치.
}

function shop() {
  //shop page에 product를 생성하는 함수들 실행.
  for (i = 0; i < breadList.length; i++) {
    //breadList의 길이만큼 반복 실행.
    //breadList는 ui.js 66에서 선언됨.
    product(breadList[breadList.length - 1 - i]); //breadList에 포함된 모든 품목에 대하여 product 함수 실행.
  }
}
