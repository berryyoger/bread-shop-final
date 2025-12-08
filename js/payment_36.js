let cartList = []; // [user cart DB]

function myCart(name, p, q) { // name: string, p: 상품 객체, q: 수량
  if (typeof name !== "string") return console.warn("name이 string이 아님.");
  if (!p || typeof p !== "object" || !p.var) return console.warn("p 객체가 올바르지 않음.");
  q = Number(q) || 1;
  if (q <= 0) return console.warn("수량(q)은 1 이상이어야 합니다.");

  const userCart = { user: name, cart: [] };
  const PnQ = { product: p, quantity: q };

  // 이미 해당 유저가 있는지 탐색
  const existingUser = cartList.find(u => u.user === name);

  if (existingUser) {
    // 같은 상품이 이미 담겨 있으면 수량만 증가
    const line = existingUser.cart.find(item => item.product.var === p.var);
    if (line) {
      line.quantity += q;
    } else {
      existingUser.cart.push(PnQ);
    }
  } else {
    // 첫 구매: 유저 장바구니 생성 후 추가
    userCart.cart.push(PnQ);
    cartList.push(userCart);
  }
}