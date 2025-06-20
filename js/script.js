// Дебаунс функция для оптимизации обработчика resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Определяем устройство
    const isMobile = window.detectDevice ? window.detectDevice() : false;
    
    // Оптимизированный обработчик изменения размера окна
    const handleResize = debounce(function() {
        try {
            // Повторно определяем устройство при изменении размера
            if (window.detectDevice) {
                window.detectDevice();
            }
        } catch (error) {
            console.error('Ошибка при обработке изменения размера окна:', error);
        }
    }, 250);

    window.addEventListener('resize', handleResize);
});
