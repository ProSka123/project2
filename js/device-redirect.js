// Функция для определения мобильного устройства и перенаправления
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, находимся ли мы на главной странице
    const isMainPage = window.location.pathname === '/' || 
                       window.location.pathname.includes('index.html');
    
    // Проверяем, находимся ли мы на мобильной версии
    const isMobilePage = window.location.pathname.includes('mobile-index.html');
    
    // Определяем тип устройства
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                          window.innerWidth < 768;
    
    // Перенаправляем на соответствующую версию, если нужно
    if (isMainPage && isMobileDevice && !isMobilePage) {
        window.location.href = 'mobile-index.html';
    } else if (isMobilePage && !isMobileDevice) {
        window.location.href = 'index.html';
    }
});