// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();
tg.setHeaderColor('#0a0a0a');
tg.setBackgroundColor('#0a0a0a');
tg.setBottomBarColor('#0a0a0a');

// Состояние приложения
let currentState = {
    selectedMenu: null,
    waitingForInput: false,
    inputType: null,
    currentData: null,
    history: []
};

// DOM элементы
const outputArea = document.getElementById('outputArea');
const inputArea = document.getElementById('inputArea');
const userInput = document.getElementById('userInput');
const menuButtons = document.querySelectorAll('.menu-btn');

// API URL (определяем автоматически)
const API_URL = window.location.origin;

// Функция для добавления текста в вывод
function addToOutput(text, type = 'info') {
    const line = document.createElement('div');
    line.className = `result-item ${type}`;
    
    // Добавляем эффект печатающей машинки для SpSkit
    if (type === 'spskit') {
        line.style.animation = 'glitch 0.5s infinite';
        line.style.color = '#00ff00';
        line.style.textShadow = '2px 2px #00aa00, -2px -2px #006600';
    }
    
    // Эффект печатающегося текста
    if (type === 'typing') {
        typeWriter(line, text, 0);
    } else {
        line.innerHTML = text.replace(/\n/g, '<br>');
        outputArea.appendChild(line);
    }
    
    outputArea.scrollTop = outputArea.scrollHeight;
    
    // Сохраняем в историю
    currentState.history.push({ text, type });
    
    // Звуковой эффект (визуальный)
    if (type === 'spskit') {
        addMatrixEffect();
    }
}

// Эффект печатающей машинки
function typeWriter(element, text, index) {
    if (index < text.length) {
        element.innerHTML += text.charAt(index) === '\n' ? '<br>' : text.charAt(index);
        index++;
        setTimeout(() => typeWriter(element, text, index), 10);
    } else {
        outputArea.appendChild(element);
    }
}

// Эффект матрицы для SpSkit
function addMatrixEffect() {
    const matrixDiv = document.createElement('div');
    matrixDiv.className = 'matrix-rain';
    document.body.appendChild(matrixDiv);
    
    setTimeout(() => {
        matrixDiv.remove();
    }, 2000);
}

// Функция для очистки вывода
function clearOutput() {
    outputArea.innerHTML = '<div class="prompt">[#] Выберите пункт:</div>';
    currentState.history = [];
}

// Функция для показа инпута
function showInput(placeholder, type) {
    currentState.waitingForInput = true;
    currentState.inputType = type;
    inputArea.style.display = 'flex';
    userInput.placeholder = placeholder;
    userInput.focus();
}

// Функция для скрытия инпута
function hideInput() {
    currentState.waitingForInput = false;
    currentState.inputType = null;
    inputArea.style.display = 'none';
    userInput.value = '';
}

// Приветственное сообщение с SpSkit
function showWelcomeMessage() {
    addToOutput('╔══════════════════════════════════════╗', 'spskit');
    addToOutput('║     SpSkit - DeathReBoot v2.0       ║', 'spskit');
    addToOutput('║    Terminal Access Granted           ║', 'spskit');
    addToOutput('╚══════════════════════════════════════╝', 'spskit');
    addToOutput('');
    addToOutput('[#] SpSkit Terminal инициализирован');
    addToOutput('[#] Выберите пункт меню:');
}

// Функция для показа загрузки
function showLoading(message = 'Выполняется...') {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'result-item';
    loadingDiv.innerHTML = `<span class="loading"></span> ${message}`;
    outputArea.appendChild(loadingDiv);
    outputArea.scrollTop = outputArea.scrollHeight;
    return loadingDiv;
}

// Обработка выбора меню
menuButtons.forEach(button => {
    button.addEventListener('click', () => {
        const index = button.dataset.index;
        handleMenuSelection(index);
    });
});

function handleMenuSelection(index) {
    currentState.selectedMenu = index;
    addToOutput(`\n[#] Вы выбрали пункт ${index}`);
    
    switch(index) {
        case '1': // снос через вебсайт
            addToOutput('[!] Функция в разработке');
            addToOutput('[!] Используйте меню мануалов для получения информации');
            showManualsMenu();
            break;
            
        case '2': // меню мануалов
            showManualsMenu();
            break;
            
        case '3': // поиск по базе данных
            showInput('Введите запрос для поиска (имя/email/телефон)...', 'database');
            break;
            
        case '4': // поиск по номеру
            showInput('Введите номер телефона (например: +79031234567)...', 'phone');
            break;
            
        case '5': // шифр файлов
            showFileEncryptionMenu();
            break;
            
        case '6': // поиск по IP-адресу
            showInput('Введите IP адрес (например: 51.159.135.175)...', 'ip');
            break;
            
        case '7': // генератор личности
            generateIdentity();
            break;
            
        case '8': // информация
            showInfo();
            break;
            
        case '9': // разработчик
            showDeveloper();
            break;
            
        case '10': // выход
            exitApp();
            break;
            
        default:
            addToOutput('[!] Неизвестный пункт меню');
    }
}

function showManualsMenu() {
    addToOutput('\n=== SpSkit MANUALS MENU ===');
    addToOutput('[01] Взлом социальных сетей');
    addToOutput('[02] Фишинг страницы');
    addToOutput('[03] DDoS атаки');
    addToOutput('[04] Сниффинг трафика');
    addToOutput('[05] Взлом Wi-Fi сетей');
    addToOutput('[06] Социальная инженерия');
    addToOutput('[07] OSINT методы');
    addToOutput('[08] Криптография');
    addToOutput('[09] Стеганография');
    addToOutput('[10] Reverse Engineering');
    addToOutput('[00] Назад');
    addToOutput('\n[#] Выберите пункт:');
}

function showFileEncryptionMenu() {
    addToOutput('\n=== SpSkit FILE ENCRYPTION ===');
    addToOutput('[01] Зашифровать файл (AES-256)');
    addToOutput('[02] Расшифровать файл');
    addToOutput('[03] Информация о шифровании');
    addToOutput('[04] Генерация ключа');
    addToOutput('[00] Назад');
    addToOutput('\n[#] Выберите пункт:');
}

async function generateIdentity() {
    addToOutput('\n[+] Генерация случайной личности...');
    const loading = showLoading('Генерация данных...');
    
    try {
        const response = await fetch(`${API_URL}/api/generate-identity`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        
        const data = await response.json();
        loading.remove();
        
        if (data.success) {
            const id = data.data;
            addToOutput('\n[+] SpSkit IDENTITY GENERATED:', 'spskit');
            addToOutput('╔════════════════════════════════════════╗');
            addToOutput(`║ ФИО: ${id.full_name.padEnd(35)} ║`);
            addToOutput(`║ Дата рождения: ${id.birth_date.padEnd(30)} ║`);
            addToOutput(`║ Паспорт: ${id.passport.padEnd(33)} ║`);
            addToOutput(`║ ИНН: ${id.inn.padEnd(36)} ║`);
            addToOutput(`║ СНИЛС: ${id.snils.padEnd(34)} ║`);
            addToOutput(`║ Адрес: ${id.address.padEnd(34)} ║`);
            addToOutput(`║ Телефон: ${id.phone.padEnd(32)} ║`);
            addToOutput(`║ Email: ${id.email.padEnd(34)} ║`);
            addToOutput(`║ Карта: ${id.card.padEnd(34)} ║`);
            addToOutput(`║ CVV/Exp: ${id.cvv}/${id.expiry.padEnd(28)} ║`);
            addToOutput('╚════════════════════════════════════════╝');
        } else {
            addToOutput('[!] Ошибка генерации', 'error');
        }
    } catch (error) {
        loading.remove();
        addToOutput('[!] Ошибка соединения с сервером', 'error');
    }
}

function showInfo() {
    addToOutput('\n=== SpSkit SYSTEM INFORMATION ===');
    addToOutput('Версия: 2.0.0');
    addToOutput('Платформа: Telegram Mini App');
    addToOutput('Статус: 🟢 Активен');
    addToOutput('Безопасность: Максимальный уровень');
    addToOutput('Шифрование: AES-256-GCM');
    addToOutput('Протокол: SpSkit Secure Protocol');
    addToOutput('\nДоступные модули:');
    addToOutput('✓ IP Geolocation');
    addToOutput('✓ Phone Lookup');
    addToOutput('✓ Database Search');
    addToOutput('✓ Identity Generator');
    addToOutput('✓ File Encryption');
    addToOutput('✓ OSINT Tools');
    addToOutput('\nСистема готова к работе');
}

function showDeveloper() {
    addToOutput('\n=== SpSkit DEVELOPER ===');
    addToOutput('╔════════════════════════════════╗');
    addToOutput('║  SpSkit Terminal v2.0          ║');
    addToOutput('║  DeathReBoot Edition           ║');
    addToOutput('╠════════════════════════════════╣');
    addToOutput('║  Разработчик: @userdeathreboot ║');
    addToOutput('║  Канал: @deathrebootxppv       ║');
    addToOutput('║  GitHub: /deathreboot          ║');
    addToOutput('║  Website: spskit.terminal      ║');
    addToOutput('╚════════════════════════════════╝');
    addToOutput('\n[!] Благодарности:');
    addToOutput('- Команда DeathReBoot');
    addToOutput('- Сообщество SpSkit');
    addToOutput('- Все пользователи');
    addToOutput('\n[!] Контакты для связи:');
    addToOutput('Telegram: @userdeathreboot');
    addToOutput('Email: dev@spskit.terminal');
}

function exitApp() {
    addToOutput('\n[!] Завершение работы...', 'spskit');
    addToOutput('[!] Спасибо за использование SpSkit Terminal');
    addToOutput('[!] Для перезапуска нажмите любую кнопку меню');
    
    // Очищаем состояние
    currentState = {
        selectedMenu: null,
        waitingForInput: false,
        inputType: null,
        currentData: null,
        history: []
    };
    hideInput();
}

// Обработка ввода с клавиатуры
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && currentState.waitingForInput) {
        const value = userInput.value.trim();
        if (value) {
            handleInput(value);
        }
    }
});

async function handleInput(value) {
    addToOutput(`[>] ${value}`);
    
    switch(currentState.inputType) {
        case 'ip':
            await checkIP(value);
            break;
        case 'phone':
            await checkPhone(value);
            break;
        case 'database':
            await searchDatabase(value);
            break;
        default:
            addToOutput('[!] Неизвестный тип ввода');
    }
    
    hideInput();
}

async function checkIP(ip) {
    addToOutput(`[+] Проверка IP: ${ip}`);
    const loading = showLoading('Геолокация...');
    
    try {
        const response = await fetch(`${API_URL}/api/ip`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ip })
        });
        
        const data = await response.json();
        loading.remove();
        
        if (data.success) {
            const info = data.data;
            addToOutput('\n[+] SpSkit IP GEOLOCATION RESULTS:', 'spskit');
            addToOutput('╔════════════════════════════════════╗');
            addToOutput(`║ IP адрес: ${info.ip.padEnd(27)} ║`);
            addToOutput(`║ Город: ${info.city.padEnd(30)} ║`);
            addToOutput(`║ Регион: ${info.region.padEnd(29)} ║`);
            addToOutput(`║ Страна: ${info.country.padEnd(29)} ║`);
            addToOutput(`║ Часовой пояс: ${info.timezone.padEnd(23)} ║`);
            addToOutput(`║ Координаты: ${(info.latitude + ', ' + info.longitude).padEnd(24)} ║`);
            addToOutput(`║ Провайдер: ${info.org.padEnd(27)} ║`);
            addToOutput('╚════════════════════════════════════╝');
        } else {
            addToOutput('[!] Не удалось получить информацию', 'error');
        }
    } catch (error) {
        loading.remove();
        addToOutput('[!] Ошибка соединения с сервером', 'error');
    }
    
    addToOutput('\nНажмите enter...');
}

async function checkPhone(phone) {
    addToOutput(`[+] Проверка номера: ${phone}`);
    const loading = showLoading('Поиск в базах данных...');
    
    try {
        const response = await fetch(`${API_URL}/api/phone`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone })
        });
        
        const data = await response.json();
        loading.remove();
        
        if (data.success) {
            const info = data.data;
            addToOutput('\n[+] SpSkit PHONE LOOKUP RESULTS:', 'spskit');
            addToOutput('╔════════════════════════════════════╗');
            addToOutput(`║ Номер: ${info.international.padEnd(30)} ║`);
            addToOutput(`║ Страна: ${info.country.padEnd(30)} ║`);
            addToOutput(`║ Регион: ${info.location.padEnd(30)} ║`);
            addToOutput(`║ Оператор: ${info.carrier.padEnd(28)} ║`);
            addToOutput(`║ Часовой пояс: ${info.timezone.padEnd(24)} ║`);
            addToOutput(`║ Валидный: ${info.valid ? '✅ Да' : '❌ Нет'.padEnd(26)} ║`);
            addToOutput('╚════════════════════════════════════╝');
            
            if (info.valid) {
                addToOutput('\n[!] Найдено в базах данных: 3 совпадения');
            }
        } else {
            addToOutput('[!] Недействительный номер телефона', 'error');
        }
    } catch (error) {
        loading.remove();
        addToOutput('[!] Ошибка соединения с сервером', 'error');
    }
    
    addToOutput('\nНажмите enter...');
}

async function searchDatabase(query) {
    addToOutput(`[+] Поиск в базах данных: "${query}"`);
    const loading = showLoading('Сканирование утечек...');
    
    try {
        const response = await fetch(`${API_URL}/api/search`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, type: 'all' })
        });
        
        const data = await response.json();
        loading.remove();
        
        if (data.success && data.results.length > 0) {
            addToOutput('\n[+] SpSkit DATABASE SEARCH RESULTS:', 'spskit');
            addToOutput('╔════════════════════════════════════╗');
            
            data.results.forEach((result, index) => {
                if (result.type === 'user') {
                    const user = result.data;
                    addToOutput(`║ [${index + 1}] ПОЛЬЗОВАТЕЛЬ`);
                    addToOutput(`║ Имя: ${user.name.padEnd(32)} ║`);
                    addToOutput(`║ Телефон: ${user.phone.padEnd(29)} ║`);
                    addToOutput(`║ Email: ${user.email.padEnd(31)} ║`);
                    addToOutput(`║ Адрес: ${user.address.padEnd(31)} ║`);
                    addToOutput(`║ Утечка: ${user.leak.padEnd(30)} ║`);
                    addToOutput('╟────────────────────────────────╢');
                } else if (result.type === 'password') {
                    const pwd = result.data;
                    addToOutput(`║ [${index + 1}] ПАРОЛЬ`);
                    addToOutput(`║ Хеш: ${pwd.hash.padEnd(33)} ║`);
                    addToOutput(`║ Пароль: ${pwd.plain.padEnd(30)} ║`);
                    addToOutput(`║ Утечка: ${pwd.leak.padEnd(30)} ║`);
                    addToOutput('╟────────────────────────────────╢');
                }
            });
            
            addToOutput('╚════════════════════════════════════╝');
            addToOutput(`\n[!] Всего найдено: ${data.results.length} результатов`);
        } else {
            addToOutput('[!] Ничего не найдено в базах данных');
        }
    } catch (error) {
        loading.remove();
        addToOutput('[!] Ошибка соединения с сервером', 'error');
    }
    
    addToOutput('\nНажмите enter...');
}

// Обработка нажатия Escape для отмены ввода
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentState.waitingForInput) {
        hideInput();
        addToOutput('[!] Ввод отменен');
    }
});

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', () => {
    clearOutput();
    showWelcomeMessage();
    
    // Проверка соединения с API
    fetch(`${API_URL}/api/spskit-status`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('✅ SpSkit API Connected');
            }
        })
        .catch(error => {
            console.error('❌ API Connection Error:', error);
            addToOutput('[!] Внимание: Проблемы с соединением с сервером', 'error');
        });
});

// Обработка сворачивания приложения
tg.onEvent('viewportChanged', () => {
    // Адаптация интерфейса при изменении размера окна
});

// Экспорт функций для Telegram
window.Telegram.WebApp.ready();