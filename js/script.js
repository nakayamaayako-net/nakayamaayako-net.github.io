

const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu-sp');

// ハンバーガーメニューをクリックしたときにメニューを開閉
hamburger.addEventListener('click', function() {
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

const handleScroll = debounce(function () {
    // スクロール関連の値を取得
    const scrollTop = window.scrollY; // 現在のスクロール位置
    const scrollHeight = document.documentElement.scrollHeight; // ページ全体の高さ
    const clientHeight = document.documentElement.clientHeight; // ビューポートの高さ

    // logo要素の処理
    const logoElements = document.querySelectorAll('.logo'); // logoクラスを持つすべての要素を取得
    logoElements.forEach(function (logoElement) {
        if (scrollTop + clientHeight + 100 >= scrollHeight) {
            // 一番下より100px上に達した場合
            logoElement.classList.remove('to-top');
            logoElement.classList.remove('d-none');
        } else if (scrollTop > 500) {
            logoElement.classList.add('d-none');
            logoElement.classList.remove('to-top');
        } else if (scrollTop > 200) {
            logoElement.classList.add('to-top');
            logoElement.classList.remove('d-none');
        } else {
            logoElement.classList.remove('to-top');
            logoElement.classList.remove('d-none');
        }
    });

    // menu要素の処理
    const menuElements = document.querySelectorAll('.menu'); // menuクラスを持つすべての要素を取得
    menuElements.forEach(function (menuElement) {
        if (scrollTop + clientHeight + 100 >= scrollHeight) {
            // 一番下より100px上に達した場合
            menuElement.classList.remove('to-top');
            menuElement.classList.remove('d-none');
        } else if (scrollTop > 500) {
            menuElement.classList.add('to-top');
        } else {
            menuElement.classList.remove('to-top');
        }
    });
}, 100); // 100msの間隔でスクロール処理を実行

window.addEventListener('scroll', handleScroll);

window.addEventListener('DOMContentLoaded', () => {

    // DOM要素を取得
    const skillEls = document.querySelectorAll('.skills');
  
    // カウントアップの設定
    const animationDuration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(animationDuration / frameDuration);
    const easeOut = t => t * (2 - t);
    const animateCountUp = el => {
      let frame = 0;
      const countTo = parseInt(el.innerHTML, 10);
      const counter = setInterval( () => {
        frame++;
        const progress = easeOut(frame / totalFrames);
        const currentCount = Math.round(countTo * progress);
  
        if (parseInt(el.innerHTML, 10) !== currentCount) {
          el.innerHTML = currentCount;
        }
  
        if (frame === totalFrames) {
          clearInterval(counter);
        }
      }, frameDuration);
    };
  
    // Intersection observerに渡すコールバック関数
    const cb = function(entries, observer) {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          const proficiencyVal = entry.target.dataset.proficiency;
          const skillBar = entry.target.querySelector('.skill-bar');
          const percentage = entry.target.querySelector('.skill-percentage');
          const countup = entry.target.querySelector('.countup');
  
          skillBar.style.width = proficiencyVal + '%';
          percentage.style.opacity = 1;
          countup.textContent = proficiencyVal;
          animateCountUp(countup);
  
          observer.unobserve(entry.target);
        }
      });
    };
  
    // Intersection observerに渡すオプション
    const options = {
      rootMargin: "-100px 0px"
    };
  
    // IntersectionObserver初期化
    const io = new IntersectionObserver(cb, options);
    io.POLL_INTERVAL = 100; // Polyfillの設定
    skillEls.forEach(el => {
      io.observe(el);
    });
  
  });
