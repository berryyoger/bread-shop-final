let cartList = []//[user cart DB]

function myCart(name, p, q) {
    let userCart = {
        user: name,
        cart : []
    }
    console.log(userCart)
    let PnQ = {
        product: p,
        quantity: q
    }
    console.log(PnQ
        )
    userCart.cart.push(PnQ)
    cartList.push(userCart)
}//user가 구매를 확정하면 name, product, quantity의 value를 Get하여 object를 생성. 이후 DB에 전송.

