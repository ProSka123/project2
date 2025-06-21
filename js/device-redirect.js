// Улучшенная функция для определения мобильного устройства и перенаправления
document.addEventListener('DOMContentLoaded', function() {
    // Защита от бесконечных перенаправлений
    const redirectKey = 'deviceRedirectAttempt';
    const maxRedirects = 3;
    const currentRedirects = parseInt(localStorage.getItem(redirectKey) || '0');
    
    if (currentRedirects >= maxRedirects) {
        console.log('Превышено максимальное количество перенаправлений, останавливаем');
        localStorage.removeItem(redirectKey);
        return;
    }

    // Функция для выполнения перенаправления
    const performRedirect = (targetUrl) => {
        localStorage.setItem(redirectKey, (currentRedirects + 1).toString());
        console.log(`Перенаправление на: ${targetUrl} (попытка ${currentRedirects + 1})`);
        window.location.href = targetUrl;
    };

    // Быстрая проверка без ожидания детектора
    const quickCheck = () => {
        try {
            const userAgent = navigator.userAgent.toLowerCase();
            const screenWidth = window.innerWidth;
            
            // Простая логика определения устройства
            const isMobileByUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
            const isMobileByWidth = screenWidth < 768;
            const isMobileDevice = isMobileByUA || isMobileByWidth;
            
            const isMainPage = window.location.pathname === '/' || 
                               window.location.pathname.includes('index.html');
            const isMobilePage = window.location.pathname.includes('mobile-index.html');
            const isEducationPage = window.location.pathname.includes('education.html');
            
            console.log('Quick check:', {
                isMobileDevice: isMobileDevice,
                isMainPage: isMainPage,
                isMobilePage: isMobilePage,
                isEducationPage: isEducationPage,
                screenWidth: screenWidth,
                userAgent: userAgent.substring(0, 50) + '...'
            });

            // Логика перенаправления
            if (isMainPage && isMobileDevice && !isMobilePage) {
                performRedirect('mobile-index.html');
            } else if (isMobilePage && !isMobileDevice) {
                performRedirect('index.html');
            } else if (isEducationPage && isMobileDevice) {
                // Перенаправляем на мобильную версию образования для мобильных устройств
                performRedirect('mobile-education.html');
            } else {
                console.log('Перенаправление не требуется');
                localStorage.removeItem(redirectKey);
            }
            
        } catch (error) {
            console.error('Error in quick device check:', error);
            localStorage.removeItem(redirectKey);
        }
    };

    // Запускаем быструю проверку сразу
    quickCheck();
});

// Обработчик изменения размера окна (только для десктопной версии)
window.addEventListener('resize', function() {
    // Проверяем, что мы на десктопной версии
    if (!window.location.pathname.includes('mobile-index.html')) {
        clearTimeout(window.resizeTimeout);
        window.resizeTimeout = setTimeout(() => {
            const screenWidth = window.innerWidth;
            const isMobileByWidth = screenWidth < 768;
            
            if (isMobileByWidth) {
                console.log('Размер окна изменился на мобильный, перенаправляем');
                window.location.href = 'mobile-index.html';
            }
        }, 500);
    }
});

// Очистка при загрузке страницы
window.addEventListener('load', function() {
    // Удаляем счетчик перенаправлений после успешной загрузки
    setTimeout(() => {
        localStorage.removeItem('deviceRedirectAttempt');
    }, 1000);
});

// Включить отладку
enableDeviceDebug();

// Показать информацию об устройстве
showDeviceInfo();

// Принудительно установить тип устройства
forceDeviceType('mobile');

// Функция для обработки ссылок на образование
function handleEducationLink() {
    const userAgent = navigator.userAgent.toLowerCase();
    const screenWidth = window.innerWidth;
    const isMobileByUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isMobileByWidth = screenWidth < 768;
    const isMobileDevice = isMobileByUA || isMobileByWidth;
    
    if (isMobileDevice) {
        window.location.href = 'mobile-education.html';
    } else {
        window.location.href = 'education.html';
    }
}