$(function () {
  $("#menu__admin").load("./menu.html");
  $("#danhmuc").load("./danhmuc.html");
  $("#manufactures").load("./manufacturers.html");
  $("#categorys").load("./categorys.html");
  $("#search").load("./search.html");
  checkLogin();
});

const categoryList = [
  {
    label: "Điện thoại",
    value: "1",
  },
  {
    label: "Tablet",
    value: "2",
  },
  {
    label: "Laptop",
    value: "3",
  },
];

const manufacturerList = [
  {
    label: "SAMSUNG",
    value: "1",
  },
  {
    label: "IPHONE",
    value: "2",
  },
  {
    label: "XIAOMI",
    value: "3",
  },
  {
    label: "OPPO",
    value: "4",
  },
];

let mode = "create";
let productList = [];

function handleShowManufacturer() {
  $("#content").load("menufacturer-admin.html");
}

function handleShowCategory() {
  $("#content").load("category-admin.html");
}

function handleShowProduct() {
  $("#content").load("product-admin.html");
  getProducts();
}

function checkLogin() {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  if (!userInfo) {
    window.location.href = "../logout-login/index.html";
  }
}

function getProducts() {
  $.ajax({
    url: "https://619cb1f368ebaa001753cb2b.mockapi.io/product",
    type: "GET",
    success: (response) => {
      productList = response;
      loadProducts(response);
    },
    error: (error) => {
      console.log("error::", error.statusText);
    },
  });
}

function loadProducts(products) {
  $("#tbProductAdmin").empty();
  products.forEach((item, index) => {
    const category = categoryList.find((e) => e.value === item.category)?.label;
    const manufacturer = manufacturerList.find(
      (e) => e.value === item.manufacturer
    )?.label;

    $("#tbProductAdmin").append(`
    <tr style="vertical-align: middle">
              <td>${item.id}</td>
              <td>${item.name}</td>
              <td>${item.price}</td>
              <td>6.9 inches</td>
              <td>ProductDetail1</td>
              <td>5</td>
              <td>
                <img
                  style="width: 50px; height: 50px"
                  src=${item.image}
                />
              </td>
              <td>${manufacturer}</td>
              <td>${category}</td>
              <td>
                <button
                  onclick="handleEditProduct(${index})"
                  type="button"
                  class="btn btn-warning"
                >
                  Edit
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-danger" onclick="deleteProduct(${item.id})">Delete</button>
              </td>
            </tr>`);
  });
}

function deleteProduct(productId) {
  $.ajax({
    url: "https://619cb1f368ebaa001753cb2b.mockapi.io/product/" + productId,
    type: "DELETE",
    success: (response) => {
      alert("Delete thanh cong");
      getProducts();
    },
    error: (error) => {
      console.log("error::", error.statusText);
    },
  });
}

function handleCreateProduct() {
  $("#ModalCreateProduct").modal("show");
}

function handleSaveProduct() {
  const productItem = {
    name: $("#NameCreateProducts").val(),
    price: $("#PriceCreateProducts").val(),
    image: $("#ImageCreateProducts").val(),
    category: $("#CategoryCreateProducts").val(),
    manufacturer: $("#ManufacturerCreateProducts").val(),
  };
  if (mode === "create") {
    createProduct(productItem);
  }
  if (mode === "edit") {
    editProduct(productItem, $("#IdCreateProducts").val());
  }
}

function createProduct(productItem) {
  $.ajax({
    url: "https://619cb1f368ebaa001753cb2b.mockapi.io/product/",
    type: "POST",
    data: productItem,
    success: (response) => {
      alert("Them moi thanh cong");
      $("#ModalCreateProduct").modal("hide");
      resetForm();
      getProducts();
    },
    error: (error) => {
      console.log("error::", error.statusText);
    },
  });
}

function resetForm() {
  $(
    "#NameCreateProducts, #PriceCreateProducts, #ImageCreateProducts, #CategoryCreateProducts, #ManufacturerCreateProducts"
  ).val("");
}

function handleEditProduct(index) {
  $("#ModalCreateProduct").modal("show");
  mode = "edit";
  const item = productList[index];
  $("#IdCreateProducts").val(item.id);
  $("#NameCreateProducts").val(item.name);
  $("#PriceCreateProducts").val(item.price);
  $("#ImageCreateProducts").val(item.image);
  $("#CategoryCreateProducts").val(item.category);
  $("#ManufacturerCreateProducts").val(item.manufacturer);
  $("#modal-title").text("Edit product");
}

function editProduct(productItem, productId) {
  $.ajax({
    url: "https://619cb1f368ebaa001753cb2b.mockapi.io/product/" + productId,
    type: "PUT",
    data: productItem,
    success: (response) => {
      alert("Chinh sua thanh cong");
      $("#ModalCreateProduct").modal("hide");
      resetForm();
      getProducts();
    },
    error: (error) => {
      console.log("error::", error.statusText);
    },
  });
}
