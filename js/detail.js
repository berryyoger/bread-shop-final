const params = new URLSearchParams(location.search);
const breadKey = params.get("bread");
console.log(breadKey);


function buy(bread) {
    const buy = document.createElement("article")
    buy.classList.add("buyArticle")
    buy.innerHTML = `
        <section class="buyInfo">
            <img src="/assets/`+ bread.var +`.png" alt="">
        </section>
        <section class="buyBuy">
            <h1>` + bread.name + `</h1>
            <h2>`+ bread.meta+`</h2>
            <h3>`+ bread.onPage+`</h3>
            <form action="">
                <input type="number" value="count" placeholder="amount">
                <input type="radio">
                <input type="submit" value="Buy">
                <input type="submit" value="Add to cart">
            </form>
        </section>`;
    document.body.append(buy);
}

document.addEventListener("DOMContentLoaded", () =>{
    const product = breadList.find(item => item.var === breadKey);
    buy(product);
})