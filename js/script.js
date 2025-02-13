

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


  'use strict'; /* 厳格にエラーをチェック */

{ /* ローカルスコープ */

// DOM取得
const tabMenus = document.querySelectorAll('.tab__menu-item');
console.log(tabMenus);

// イベント付加
tabMenus.forEach((tabMenu) => {
  tabMenu.addEventListener('click', tabSwitch);
})

// イベントの処理
function tabSwitch(e) {

  // クリックされた要素のデータ属性を取得
  const tabTargetData = e.currentTarget.dataset.tab;
  // クリックされた要素の親要素と、その子要素を取得
  const tabList = e.currentTarget.closest('.tab__menu');
  console.log(tabList);
  const tabItems = tabList.querySelectorAll('.tab__menu-item');
  console.log(tabItems);
  // クリックされた要素の親要素の兄弟要素の子要素を取得
  const tabPanelItems = tabList.
  nextElementSibling.querySelectorAll('.tab__panel-box');
  console.log(tabPanelItems);

  // クリックされたtabの同階層のmenuとpanelのクラスを削除
  tabItems.forEach((tabItem) => {
    tabItem.classList.remove('is-active');
  })
  tabPanelItems.forEach((tabPanelItem) => {
    tabPanelItem.classList.remove('is-show');
  })

  // クリックされたmenu要素にis-activeクラスを付加
  e.currentTarget.classList.add('is-active');
  // クリックしたmenuのデータ属性と等しい値を持つパネルにis-showクラスを付加
  tabPanelItems.forEach((tabPanelItem) => {
    if (tabPanelItem.dataset.panel ===  tabTargetData) {
      tabPanelItem.classList.add('is-show');
    }
  })

}

}

document.addEventListener("DOMContentLoaded", function () {
  const targets = document.querySelectorAll(".frame-in");

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("show");
              observer.unobserve(entry.target); // 1回だけ実行する場合
          }
      });
  }, {
      root: null,
      rootMargin: "-100px",
      threshold: 0.1 // 10%見えたら実行
  });

  targets.forEach(target => {
      observer.observe(target);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".mySwiper", {
      loop: true, // 無限ループ
      autoplay: true,         //自動再生
      autoplaySpeed: 3,
      spaceBetween: 20, // スライド間のスペース
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
      },
      pagination: {
          el: ".swiper-pagination",
          clickable: true
      }
  });

  // 画像クリックイベント
  document.querySelectorAll(".swiper-slide img").forEach(img => {
      img.addEventListener("click", () => {
          console.log(`クリックされた画像: ${img.src}`);
      });
  });
});
