const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// document.getElementById("input").value => $("#username").val()
// document.getElementById("input").value = "Quoc" => => $("#username").val("Quoc")
// dang ky
const onSignUp = () => {
  const userInfo = {
    username: $("#username").val(),
    password: $("#password").val(),
    fullName: $("#fullName").val(),
  };
  $.ajax({
    type: "POST",
    url: "https://619cb1f368ebaa001753cb2b.mockapi.io/user",
    data: userInfo,
    success: (response) => {
      alert("Dang ky thanh cong!!!");
      $("#username").val("");
      $("#password").val("");
      $("#fullName").val("");
    },
    error: (error) => {
      console.log("error::", error.statusText);
    },
  });
};
$("#signUpBtn").click(onSignUp);

// dang nhap
const onSignIn = () => {
  $.ajax({
    type: "GET",
    url: "https://619cb1f368ebaa001753cb2b.mockapi.io/user",
    success: (response) => {
      const correctUser = response.find((item) => {
        return (
          item.username === $("#usernameSignin").val() &&
          item.password === $("#passwordSignin").val()
        );
      });

      if (correctUser) {
        alert("Dang nhap thanh cong!");
        localStorage.setItem("userInfo", JSON.stringify(correctUser));
        window.location.href = "../admin/index.html";
      } else {
        alert("Dang nhap that bai!");
      }
    },
    error: (error) => {
      console.log("error::", error.statusText);
    },
  });
};

$("#signInBtn").click(onSignIn);
