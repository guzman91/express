let toCurrency = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "UAH",
  }).format(price);
};

let toDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(Date.parse(date));
};

document.querySelectorAll(".price").forEach((price) => {
  price.textContent = toCurrency(price.textContent);
});

document.querySelectorAll(".date").forEach((date) => {
  date.textContent = toDate(date.textContent);
});

let course = document.querySelector("#remove");

if (course) {
  course.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-btn")) {
      let id = event.target.dataset.id;
      fetch("/courses/remove/" + id, {
        method: "delete",
      })
        .then((response) => response.json())
        .then((res) => {
          //let res = JSON.parse(result);
          //console.log("result", res);
          if (res.userCart.length) {
            let newArray = res.userCart.map((item) => {
              let coub = `
            <tr>
              <td>${item.title}</td>
              <td>${item.count}</td>
              <td><a class="waves-effect waves-light btn remove-btn" data-id="${item.id}">Delete</a></td>
            </tr>
              `;
              return coub;
            });
            course.querySelector("tbody").innerHTML = newArray.join("");
            course.querySelector(".price").textContent = toCurrency(res.cartAmount);
          } else {
            course.innerHTML = "<h1>Your Shopping Cart is empty</h1>";
          }
        });
    } else {
      //not delete clicked
    }
  });
} else {
}
