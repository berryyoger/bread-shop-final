//brdCount
function f1(){
    let total, result;
    let baguette = (document.querySelector('#baguette').value);
    let croissant = (document.querySelector('#croissant').value);
    let pTag = document.querySelector('#d1')

    totalBrd = Number(baguette)+Number(croissant)
    total = Number(baguette)*3000+Number(croissant)*4000

    if(totalBrd>=12) paperBag='5개';
    else if(totalBrd>=9) paperBag='4개';
    else if(totalBrd>=6) paperBag='3개';
    else if(totalBrd>=3) paperBag='2개';
    else paperBag='1'

    result = "<br> 총 결제금액 : " + total;
    result = result + "<br> 종이봉투 : " + paperBag;
    pTag.innerHTML = result;
}

//brdSelect
function dataReading(){
    let output = "선택한 빵 : "
    let obj1 = document.querySelector("#s");
    output = output + obj1.options[obj1.selectedIndex].value;
    let obj2 = document.querySelector("#result");
    obj2.innerHTML = output;
}