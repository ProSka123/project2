<?php
// Проверяем, что форма была отправлена методом POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Получаем данные из формы
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $message = $_POST['message'] ?? '';
    
    // Валидация данных
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(['success' => false, 'message' => 'Пожалуйста, заполните все обязательные поля']);
        exit;
    }
    
    // Проверка email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Пожалуйста, введите корректный email']);
        exit;
    }
    
    // Настройки письма
    $to = "tirish@mail.ru"; // Ваша почта
    $subject = "Новое сообщение с сайта от " . $name;
    
    // Формируем тело письма
    $email_content = "
    <html>
    <head>
        <title>Новое сообщение с сайта</title>
    </head>
    <body>
        <h2>Новое сообщение с сайта</h2>
        <p><strong>Имя:</strong> " . htmlspecialchars($name) . "</p>
        <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
        <p><strong>Телефон:</strong> " . htmlspecialchars($phone) . "</p>
        <p><strong>Сообщение:</strong></p>
        <p>" . nl2br(htmlspecialchars($message)) . "</p>
        <hr>
        <p><small>Отправлено с сайта " . $_SERVER['HTTP_HOST'] . "</small></p>
    </body>
    </html>
    ";
    
    // Заголовки письма
    $headers = array(
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . $email,
        'Reply-To: ' . $email,
        'X-Mailer: PHP/' . phpversion()
    );
    
    // Отправляем письмо
    if (mail($to, $subject, $email_content, implode("\r\n", $headers))) {
        echo json_encode(['success' => true, 'message' => 'Сообщение успешно отправлено!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Ошибка при отправке сообщения']);
    }
    
} else {
    echo json_encode(['success' => false, 'message' => 'Неверный метод запроса']);
}
?> 