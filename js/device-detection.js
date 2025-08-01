// Улучшенная функция определения устройства с более точным обнаружением
class DeviceDetector {
    constructor() {
        this.deviceType = null;
        this.isInitialized = false;
        // Инициализируем асинхронно, чтобы не блокировать загрузку
        setTimeout(() => this.init(), 0);
    }

    init() {
        this.detectDevice();
        this.setupEventListeners();
        this.isInitialized = true;
    }

    // Основная функция определения устройства
    detectDevice() {
        try {
            const userAgent = navigator.userAgent.toLowerCase();
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const pixelRatio = window.devicePixelRatio || 1;
            
            // Более точное определение мобильных устройств
            const mobilePatterns = [
                /android/i,
                /iphone/i,
                /ipod/i,
                /blackberry/i,
                /windows phone/i,
                /opera mini/i,
                /mobile/i,
                /tablet/i,
                /ipad/i
            ];

            // Определение планшетов
            const tabletPatterns = [
                /ipad/i,
                /tablet/i,
                /playbook/i,
                /kindle/i
            ];

            // Проверка на мобильные браузеры
            const isMobileBrowser = mobilePatterns.some(pattern => pattern.test(userAgent));
            
            // Проверка на планшеты
            const isTabletBrowser = tabletPatterns.some(pattern => pattern.test(userAgent));
            
            // Проверка по размеру экрана и ориентации
            const isSmallScreen = screenWidth < 768;
            const isMediumScreen = screenWidth >= 768 && screenWidth < 1024;
            const isLargeScreen = screenWidth >= 1024;
            
            // Проверка на сенсорный экран
            const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            
            // Проверка на мобильную ориентацию
            const isPortrait = screenHeight > screenWidth;
            
            // Дополнительные проверки для современных браузеров
            const hasMobileFeatures = this.checkMobileFeatures();
            
            // Логика определения типа устройства
            let deviceType = 'desktop';
            
            if (isTabletBrowser || (isMediumScreen && hasTouchScreen)) {
                deviceType = 'tablet';
            } else if (isMobileBrowser || isSmallScreen || hasMobileFeatures || 
                      (hasTouchScreen && isSmallScreen)) {
                deviceType = 'mobile';
            } else if (isLargeScreen && !hasTouchScreen) {
                deviceType = 'desktop';
            }

            // Дополнительная проверка для iPad в десктопном режиме
            if (userAgent.includes('ipad') && !userAgent.includes('mobile')) {
                deviceType = 'tablet';
            }

            // Проверка на эмуляцию мобильного устройства в DevTools
            if (this.isEmulatedMobile()) {
                deviceType = 'mobile';
            }

            this.deviceType = deviceType;
            this.updateBodyClasses();
            this.logDetection();
            
            return deviceType;
            
    } catch (error) {
        console.error('Error in detectDevice:', error);
            this.deviceType = 'desktop'; // Безопасное значение по умолчанию
            return 'desktop';
        }
    }

    // Проверка мобильных функций
    checkMobileFeatures() {
        try {
            // Проверка на мобильные API
            const hasMobileAPIs = (
                'geolocation' in navigator ||
                'vibrate' in navigator ||
                'getBattery' in navigator ||
                'connection' in navigator
            );

            // Проверка на мобильные события
            const hasMobileEvents = (
                'ontouchstart' in window ||
                'ontouchmove' in window ||
                'ontouchend' in window
            );

            // Проверка на мобильные свойства экрана
            const hasMobileScreenProps = (
                window.screen && (
                    window.screen.orientation ||
                    window.screen.availWidth !== window.screen.width
                )
            );

            return hasMobileAPIs || hasMobileEvents || hasMobileScreenProps;
        } catch (error) {
            return false;
        }
    }

    // Проверка на эмуляцию мобильного устройства
    isEmulatedMobile() {
        try {
            // Проверка на DevTools
            const devtools = {
                open: false,
                orientation: null
            };

            const threshold = 160;
            const checkDevTools = () => {
                if (window.outerHeight - window.innerHeight > threshold || 
                    window.outerWidth - window.innerWidth > threshold) {
                    devtools.open = true;
                }
            };

            checkDevTools();
            
            // Проверка на эмуляцию в Chrome DevTools
            if (window.chrome && window.chrome.webstore) {
                return false; // Это десктопный Chrome
            }

            return devtools.open;
        } catch (error) {
            return false;
        }
    }

    // Обновление классов на body
    updateBodyClasses() {
        if (!document.body) return;

        // Удаляем старые классы
        document.body.classList.remove('mobile-device', 'tablet-device', 'desktop-device');
        
        // Добавляем новый класс
        switch (this.deviceType) {
            case 'mobile':
                document.body.classList.add('mobile-device');
                break;
            case 'tablet':
                document.body.classList.add('tablet-device');
                break;
            case 'desktop':
                document.body.classList.add('desktop-device');
                break;
        }
    }

    // Логирование результатов обнаружения
    logDetection() {
        const info = {
            deviceType: this.deviceType,
            userAgent: navigator.userAgent,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            pixelRatio: window.devicePixelRatio,
            hasTouch: 'ontouchstart' in window,
            maxTouchPoints: navigator.maxTouchPoints
        };

        console.log('Device Detection Results:', info);
        console.log('Устройство определено как:', this.deviceType);
    }

    // Настройка обработчиков событий
    setupEventListeners() {
        // Обработчик изменения размера окна
        window.addEventListener('resize', () => {
            this.detectDevice();
        });

        // Обработчик изменения ориентации
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.detectDevice();
            }, 100);
        });

        // Обработчик изменения видимости страницы
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.detectDevice();
            }
        });
    }

    // Публичные методы
    isMobile() {
        return this.deviceType === 'mobile';
    }

    isTablet() {
        return this.deviceType === 'tablet';
    }

    isDesktop() {
        return this.deviceType === 'desktop';
    }

    getDeviceType() {
        return this.deviceType;
    }

    // Метод для принудительного переопределения типа устройства
    setDeviceType(type) {
        if (['mobile', 'tablet', 'desktop'].includes(type)) {
            this.deviceType = type;
            this.updateBodyClasses();
            console.log('Тип устройства принудительно установлен как:', type);
        }
    }
}

// Создаем глобальный экземпляр детектора
const deviceDetector = new DeviceDetector();

// Экспортируем функции для обратной совместимости
window.detectDevice = () => deviceDetector.detectDevice();
window.isMobileDevice = () => deviceDetector.isMobile();
window.isTabletDevice = () => deviceDetector.isTablet();
window.isDesktopDevice = () => deviceDetector.isDesktop();
window.getDeviceType = () => deviceDetector.getDeviceType();
window.setDeviceType = (type) => deviceDetector.setDeviceType(type);

// Инициализация при загрузке DOM (неблокирующая)
document.addEventListener('DOMContentLoaded', function() {
    // Детектор уже инициализируется асинхронно в конструкторе
    console.log('Device detector initialized');
});

// Экспортируем детектор для использования в других модулях
window.deviceDetector = deviceDetector;
