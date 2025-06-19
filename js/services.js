// Новый файл для обработки карточек услуг
document.addEventListener('DOMContentLoaded', function() {
    console.log('Загружен скрипт services.js');
    
    // Находим все кнопки "Подробнее" и "Назад"
    const serviceButtons = document.querySelectorAll('.service-button');
    const backButtons = document.querySelectorAll('.back-button');
    
    console.log('Найдено кнопок "Подробнее":', serviceButtons.length);
    console.log('Найдено кнопок "Назад":', backButtons.length);
    
    // Добавляем обработчики для кнопок "Подробнее"
    serviceButtons.forEach(button => {
        button.onclick = function(e) {
            e.preventDefault();
            const serviceType = this.getAttribute('data-service');
            console.log('Клик по кнопке "Подробнее" для услуги:', serviceType);
            
            const card = document.getElementById(`service-${serviceType}`);
            if (card) {
                card.classList.add('flipped');
                console.log('Карточка перевернута:', card.id);
            } else {
                console.error('Карточка не найдена:', `service-${serviceType}`);
            }
        };
    });
    
    // Добавляем обработчики для кнопок "Назад"
    backButtons.forEach(button => {
        button.onclick = function(e) {
            e.preventDefault();
            console.log('Клик по кнопке "Назад"');
            
            const card = this.closest('.service-card');
            if (card) {
                card.classList.remove('flipped');
                console.log('Карточка возвращена в исходное положение:', card.id);
            } else {
                console.error('Родительская карточка не найдена');
            }
        };
    });
    
    // Добавляем обработчики для кнопок "Записаться"
    const enrollButtons = document.querySelectorAll('.service-card-back .primary-button, .service-card-back .enroll-button');
    console.log('Найдено кнопок "Записаться":', enrollButtons.length);
    
    enrollButtons.forEach(button => {
        console.log('Добавляем обработчик для кнопки:', button);
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Клик по кнопке "Записаться"');
            
            // Получаем название услуги из родительской карточки
            const card = this.closest('.service-card');
            const serviceName = card ? card.querySelector('h3').textContent : 'Услуга';
            console.log('Выбрана услуга:', serviceName);
            
            // Находим секцию контактов
            const contactSection = document.getElementById('contact');
            if (!contactSection) {
                console.error('Секция контактов не найдена!');
                return;
            }
            
            // Находим форму и поле сообщения
            const contactForm = contactSection.querySelector('form');
            const messageField = contactSection.querySelector('#message, [name="message"], textarea');
            
            console.log('Форма контактов:', contactForm ? 'найдена' : 'не найдена');
            console.log('Поле сообщения:', messageField ? 'найдено' : 'не найдено');
            
            // Прокручиваем к форме контактов
            const headerHeight = document.querySelector('header').offsetHeight || 0;
            const contactPosition = contactSection.getBoundingClientRect().top + window.scrollY;
            
            console.log('Прокручиваем к позиции:', contactPosition - headerHeight - 20);
            
            window.scrollTo({
                top: contactPosition - headerHeight - 20,
                behavior: 'smooth'
            });
            
            // Заполняем поле сообщения информацией об услуге
            if (messageField) {
                messageField.value = `Здравствуйте! Хочу записаться на услугу "${serviceName}".`;
                
                // Небольшая задержка перед установкой фокуса, чтобы прокрутка завершилась
                setTimeout(() => {
                    messageField.focus();
                }, 800);
            }
            
            // Добавляем подсветку формы
            if (contactForm) {
                contactForm.classList.add('highlight-form');
                setTimeout(() => {
                    contactForm.classList.remove('highlight-form');
                }, 2000);
            }
        });
    });
    
    // Проверяем, работают ли обычные ссылки с якорями
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            console.log('Клик по якорной ссылке:', this.getAttribute('href'));
        });
    });
});


