const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

const forms = document.querySelector(".forms"),
    pwShowHide = document.querySelectorAll(".eye-icon"),
    links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");

        pwFields.forEach(password => {
            if (password.type === "password") {
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        })

    })
})

links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault(); //preventing form submit
        forms.classList.toggle("show-signup");
    })
})


const handleSignup = (name, email, password) => {
    fetch("http://localhost:8000/signup", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            userName: email,
            password: password
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json())
        .then((json) => console.log(json.name))
        .then(() => forms.classList.toggle("show-signup"))
}

const handleLogin = (email, password) => {
    fetch("http://localhost:8000/login", {
        method: "POST",
        body: JSON.stringify({
            userName: email,
            password: password
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json())
        .then((json) => {
            localStorage.setItem("isLoggedIn", 1);
            window.location.href = 'homepage.html';
        })
}


signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword){
        alert("Passwords do not match")
    }else{
        handleSignup(name, email, password);
    }
})


loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginmail").value;
    const password = document.getElementById("loginpass").value;

    handleLogin(email, password);


})
