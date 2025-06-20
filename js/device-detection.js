// Улучшенная функция определения устройства
function detectDevice() {
    try {
        // Проверяем как по User Agent, так и по ширине экрана
        const isMobileByUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isMobileByWidth = window.innerWidth < 768;
        const isMobile = isMobileByUA || isMobileByWidth;

        // Добавляем класс к body для CSS-стилизации
        if (document.body) {
            document.body.classList.toggle('mobile-device', isMobile);
            document.body.classList.toggle('desktop-device', !isMobile);
        }

        console.log('Устройство определено как:', isMobile ? 'мобильное' : 'десктоп');

        return isMobile;
    } catch (error) {
        console.error('Error in detectDevice:', error);
        return false; // Возвращаем false как безопасное значение по умолчанию
    }
}

// Экспортируем функцию для использования в других скриптах
window.detectDevice = detectDevice;

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    detectDevice();
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', function() {
        detectDevice();
    });
});
