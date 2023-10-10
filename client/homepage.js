const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');W
    if (isLoggedIn==0 || isLoggedIn==undefined) {
        console.log("You are not logged in")
        window.location.href = 'login.html';
    }
});

const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', () => {
    localStorage.setItem('isLoggedIn', 0);
    window.location.href = 'login.html';
})

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

