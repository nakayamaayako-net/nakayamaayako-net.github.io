

const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu-sp');

// ハンバーガーメニューをクリックしたときにメニューを開閉
hamburger.addEventListener('click', function() {
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
});