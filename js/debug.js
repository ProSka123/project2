// Файл для отладки и тестирования обнаружения устройств
class DeviceDebugger {
    constructor() {
        this.debugMode = false;
        this.init();
    }

    init() {
        // Проверяем, включен ли режим отладки (можно включить через консоль)
        if (window.location.search.includes('debug=device') || 
            localStorage.getItem('deviceDebug') === 'true') {
            this.debugMode = true;
            this.showDebugPanel();
        }

        // Добавляем глобальные функции для отладки
        window.enableDeviceDebug = () => this.enableDebug();
        window.disableDeviceDebug = () => this.disableDebug();
        window.testDeviceDetection = () => this.testDetection();
    }

    enableDebug() {
        this.debugMode = true;
        localStorage.setItem('deviceDebug', 'true');
        this.showDebugPanel();
        console.log('Device debug mode enabled');
    }

    disableDebug() {
        this.debugMode = false;
        localStorage.removeItem('deviceDebug');
        this.hideDebugPanel();
        console.log('Device debug mode disabled');
    }

    showDebugPanel() {
        if (document.getElementById('device-debug-panel')) return;

        const panel = document.createElement('div');
        panel.id = 'device-debug-panel';
        panel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 15px;
            border-radius: 8px;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;

        panel.innerHTML = `
            <div style="margin-bottom: 10px; font-weight: bold; border-bottom: 1px solid #555; padding-bottom: 5px;">
                Device Detection Debug
            </div>
            <div id="debug-content"></div>
            <div style="margin-top: 10px; border-top: 1px solid #555; padding-top: 5px;">
                <button onclick="window.disableDeviceDebug()" style="background: #ff4444; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Close</button>
                <button onclick="window.testDeviceDetection()" style="background: #44aa44; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-left: 5px;">Test</button>
            </div>
        `;

        document.body.appendChild(panel);
        this.updateDebugInfo();
    }

    hideDebugPanel() {
        const panel = document.getElementById('device-debug-panel');
        if (panel) {
            panel.remove();
        }
    }

    updateDebugInfo() {
        if (!this.debugMode) return;

        const content = document.getElementById('debug-content');
        if (!content) return;

        const deviceDetector = window.deviceDetector;
        if (!deviceDetector) {
            content.innerHTML = '<div style="color: #ff4444;">Device detector not available</div>';
            return;
        }

        const info = {
            deviceType: deviceDetector.getDeviceType(),
            userAgent: navigator.userAgent.substring(0, 50) + '...',
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            pixelRatio: window.devicePixelRatio,
            hasTouch: 'ontouchstart' in window,
            maxTouchPoints: navigator.maxTouchPoints,
            orientation: window.screen.orientation ? window.screen.orientation.type : 'unknown',
            bodyClasses: document.body ? Array.from(document.body.classList).join(', ') : 'none'
        };

        content.innerHTML = `
            <div style="margin-bottom: 8px;">
                <strong>Device Type:</strong> <span style="color: #44ff44;">${info.deviceType}</span>
            </div>
            <div style="margin-bottom: 8px;">
                <strong>Screen:</strong> ${info.screenWidth}×${info.screenHeight} (${info.pixelRatio}x)
            </div>
            <div style="margin-bottom: 8px;">
                <strong>Touch:</strong> ${info.hasTouch ? 'Yes' : 'No'} (${info.maxTouchPoints} points)
            </div>
            <div style="margin-bottom: 8px;">
                <strong>Orientation:</strong> ${info.orientation}
            </div>
            <div style="margin-bottom: 8px;">
                <strong>Body Classes:</strong> ${info.bodyClasses}
            </div>
            <div style="margin-bottom: 8px;">
                <strong>User Agent:</strong> ${info.userAgent}
            </div>
        `;
    }

    testDetection() {
        console.log('=== Device Detection Test ===');
        
        const deviceDetector = window.deviceDetector;
        if (!deviceDetector) {
            console.error('Device detector not available');
            return;
        }

        // Тестируем различные сценарии
        const tests = [
            { name: 'Current Device', test: () => deviceDetector.detectDevice() },
            { name: 'Is Mobile', test: () => deviceDetector.isMobile() },
            { name: 'Is Tablet', test: () => deviceDetector.isTablet() },
            { name: 'Is Desktop', test: () => deviceDetector.isDesktop() },
            { name: 'Get Device Type', test: () => deviceDetector.getDeviceType() }
        ];

        tests.forEach(test => {
            try {
                const result = test.test();
                console.log(`${test.name}:`, result);
            } catch (error) {
                console.error(`${test.name} error:`, error);
            }
        });

        // Тестируем принудительное изменение типа устройства
        console.log('=== Testing Device Type Override ===');
        const originalType = deviceDetector.getDeviceType();
        
        ['mobile', 'tablet', 'desktop'].forEach(type => {
            deviceDetector.setDeviceType(type);
            console.log(`Forced to ${type}:`, deviceDetector.getDeviceType());
        });

        // Возвращаем оригинальный тип
        deviceDetector.setDeviceType(originalType);
        console.log('Restored to original type:', deviceDetector.getDeviceType());
    }
}

// Инициализация отладчика
document.addEventListener('DOMContentLoaded', function() {
    const deviceDebugger = new DeviceDebugger();
    
    // Обновляем информацию каждые 2 секунды в режиме отладки
    setInterval(() => {
        if (deviceDebugger.debugMode) {
            deviceDebugger.updateDebugInfo();
        }
    }, 2000);
});

// Глобальные функции для консоли
window.showDeviceInfo = function() {
    const deviceDetector = window.deviceDetector;
    if (!deviceDetector) {
        console.log('Device detector not available');
        return;
    }

    console.log('=== Device Information ===');
    console.log('Device Type:', deviceDetector.getDeviceType());
    console.log('Is Mobile:', deviceDetector.isMobile());
    console.log('Is Tablet:', deviceDetector.isTablet());
    console.log('Is Desktop:', deviceDetector.isDesktop());
    console.log('User Agent:', navigator.userAgent);
    console.log('Screen Size:', window.innerWidth + '×' + window.innerHeight);
    console.log('Pixel Ratio:', window.devicePixelRatio);
    console.log('Touch Support:', 'ontouchstart' in window);
    console.log('Max Touch Points:', navigator.maxTouchPoints);
    console.log('Body Classes:', document.body ? Array.from(document.body.classList) : 'none');
};

window.forceDeviceType = function(type) {
    const deviceDetector = window.deviceDetector;
    if (!deviceDetector) {
        console.log('Device detector not available');
        return;
    }

    if (['mobile', 'tablet', 'desktop'].includes(type)) {
        deviceDetector.setDeviceType(type);
        console.log(`Device type forced to: ${type}`);
        window.showDeviceInfo();
    } else {
        console.log('Invalid device type. Use: mobile, tablet, or desktop');
    }
};