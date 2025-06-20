// Оставляем только функцию определения устройства
// Остальной код для мобильной оптимизации удален

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    // Определяем устройство при загрузке страницы
    if (window.detectDevice) {
        window.detectDevice();
    }
});

