let toCurrency = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "UAH",
  }).format(price);
};

document.querySelectorAll(".price").forEach((price) => {
  price.textContent = toCurrency(price.textContent);
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
        .then((result) => {
          let res = JSON.parse(result);
          if (res.courses.length) {
            let newArray = res.courses.map((item) => {
              let coub = `
              
            <tr>
              <td>${item.course}</td>
              <td>${item.count}</td>
              <td><a class="waves-effect waves-light btn remove-btn" data-id="${item.id}">Delete</a></td>
            </tr>
              `;
              return coub;
            });
            course.querySelector("tbody").innerHTML = newArray.join("");
            course.querySelector(".price").textContent = toCurrency(res.price);
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
