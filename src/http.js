export async function fetchAvailableMeals() {
  const response = await fetch("http://localhost:3000/meals");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failded to fetch meals");
  }

  return resData;
}

export async function updateUserOrder(order) {
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    body: JSON.stringify({ order }),
    headers: { "Content-Type": "application/json" },
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to update orders");
  }
  return resData;
}

export async function fetchAvailableOrders() {
  const response = await fetch("http://localhost:3000/orders");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failded to fetch orders");
  }

  return resData;
}
