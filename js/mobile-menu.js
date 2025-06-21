// Оставляем только функцию определения устройства
// Остальной код для мобильной оптимизации удален

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    // Определяем устройство при загрузке страницы
    if (window.detectDevice) {
        window.detectDevice();
    }
});

// Slide-down анимация для гамбургера при прокрутке
(function() {
    const burger = document.querySelector('.mobile-menu-toggle');
    if (!burger) return;
    let lastScroll = 0;
    let ticking = false;

    function updateBurgerVisibility() {
        const scrollY = window.scrollY || window.pageYOffset;
        const hero = document.getElementById('home') || document.querySelector('.hero');
        let heroHeight = 0;
        if (hero) {
            heroHeight = hero.offsetHeight;
        }
        // Показываем гамбургер только если прокрутили ниже hero
        if (scrollY > heroHeight - 60) {
            burger.classList.add('visible');
        } else {
            burger.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateBurgerVisibility();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Первоначальная проверка
    document.addEventListener('DOMContentLoaded', updateBurgerVisibility);
    window.addEventListener('resize', updateBurgerVisibility);
})();

