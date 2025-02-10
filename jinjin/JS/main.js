document.addEventListener("DOMContentLoaded", function() {
  window.scrollTo(0, 0); // ページのトップにスクロール

  const elements = [
    ...document.querySelectorAll('.fade-in'),
    ...document.querySelectorAll('.fade-in2'),
    ...document.querySelectorAll('.fade-in3')
  ];

  const rootMargin = '-20% 0px';
  const threshold = 0;

  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // 監視を停止
      }
    });
  }, { root: null, rootMargin, threshold });

  elements.forEach(element => observer.observe(element));
});


window.addEventListener('scroll', function() {
  var bottomSp = document.querySelector('.bottom-sp');
  var scrollPosition = window.scrollY;
  var scrollHeight = document.documentElement.scrollHeight;
  var clientHeight = document.documentElement.clientHeight;

  if (scrollPosition > 1000 && scrollPosition + clientHeight < scrollHeight) {
      bottomSp.classList.add('visible');
  } else {
      bottomSp.classList.remove('visible');
  }
});