const params = new URLSearchParams(location.search);
const breadKey = params.get("bread");
console.log("bread param:", breadKey);

function findProduct(bread) {
    return bread.var === breadKey;
  }

console.log(breadList.find(findProduct))

function buy(bread) {
    const buy = document.createElement("article")
    buy.classList.add("buyArticle")
    buy.innerHTML = `
        <section class="buyInfo">
            <img src="/assets/`+ bread +`.png" alt="">
        </section>
        <section class="buyBuy">
            <h1>` + bread.name + `</h1>
            <h2>Soft yeast-raised donut with a thin, shiny sugar glaze and light bite</h2>
            <h3>We fry the dough until golden and light, then coat it with a thin sugar glaze that sets to a gentle shine. Soft, airy, and not too sweet—simple and classic.</h3>
            <form action="">
                <input type="number" value="count" placeholder="amount">
                <input type="radio">
                <input type="submit" value="Buy">
                <input type="submit" value="Add to cart">
            </form>
        </section>`;
    document.body.append("buy");
}

document.addEventListener("DOMContentLoaded", () =>{
    buy(breadKey)
})