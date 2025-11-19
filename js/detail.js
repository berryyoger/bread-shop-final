const params = new URLSearchParams(location.search);
const breadKey = params.get("bread");
console.log(breadKey);

function buy(bread) {
  const buy = document.createElement("article");
  buy.classList.add("buyArticle");
  buy.innerHTML =
    `
        <section class="buyInfo">
            <img src="/assets/` +
    bread.var +
    `.png" alt="">
        </section>
        <section class="buyBuy">
        <div class="infoPart">
            <h1>` +
    bread.name +
    `</h1>
    <p>  `+ bread.cost+ ` WON </p>
            <h2>` +
    bread.meta +
    `</h2>
            <h3>` +
    bread.onPage +
    `</h3>
    </div>
            <form action="">
                <div>
                    `+ bread.remain +` Remains <input type="number" value="count" placeholder="Buy amount">
                </div>
                <div>
                    Need Package<input type="radio">
                </div>
                <div class="buyCart">
                    <input id="addCart" value="Add to cart">
                    <input id="buyNow" value="Buy Now">
                </div>
            </form>
        </section>`;
  document.body.append(buy);
}

document.addEventListener("DOMContentLoaded", () => {
  const product = breadList.find((item) => item.var === breadKey);
  buy(product);
});
