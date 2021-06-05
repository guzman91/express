document.querySelectorAll(".price").forEach((price) => {
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "UAH",
  });
  price.textContent = formatter.format(price.textContent);
});
