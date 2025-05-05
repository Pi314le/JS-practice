// convert string back into an array
export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  // localStorage only stores strings
  localStorage.setItem("orders", JSON.stringify(orders));
}
