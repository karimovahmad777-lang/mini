// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();
tg.setHeaderColor('#0a0a0a');
tg.setBackgroundColor('#0a0a0a');

// Получаем информацию о пользователе из URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user') || 'unknown';
const userName = urlParams.get('name') || 'Пользователь';

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
const userInfo = document.getElementById('userInfo');
const asciiArt = document.getElementById('asciiArt');

// Устанавливаем информацию о пользователе
userInfo.textContent = `👤 Пользователь: ${userName} (ID: ${userId})`;
asciiArt.textContent = `zoahki - DeathReBoot v2.0`;

// API URL
const API_URL = window.location.origin;

// Функции для работы с вводом
function forceNumericKeyboard() {
    userInput.type = 'tel';
    userInput.inputMode = 'numeric';
    userInput.pattern = '[0-9]*';
}

function forceTextKeyboard() {
    userInput.type = 'text';
    userInput.inputMode = 'text';
    userInput.removeAttribute('pattern');
}

// Функция для добавления текста в вывод
function addToOutput(text, type = 'info') {
    const line = document.createElement('div');
    line.className = `result-item ${type}`;
    line.innerHTML = text.replace(/\n/g, '<br>');
    outputArea.appendChild(line);
    outputArea.scrollTop = outputArea.scrollHeight;
    currentState.history.push({ text, type });
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
    
    if (type === 'ip' || type === 'phone') {
        forceNumericKeyboard();
        userInput.placeholder = placeholder;
    } else {
        forceTextKeyboard();
        userInput.placeholder = placeholder;
    }
    
    inputArea.style.display = 'flex';
    userInput.value = '';
    userInput.focus();
}

// Функция для скрытия инпута
function hideInput() {
    currentState.waitingForInput = false;
    currentState.inputType = null;
    inputArea.style.display = 'none';
    userInput.value = '';
}

// Приветственное сообщение
function showWelcomeMessage() {
    addToOutput('╔══════════════════════════════════════╗', 'spskit');
    addToOutput('║     zoahki - DeathReBoot v2.0       ║', 'spskit');
    addToOutput('║    Terminal Access Granted           ║', 'spskit');
    addToOutput('╚══════════════════════════════════════╝', 'spskit');
    addToOutput('');
    addToOutput(`[#] Добро пожаловать, ${userName}!`);
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
        case '1':
            addToOutput('[!] Функция в разработке');
            addToOutput('[!] Используйте меню мануалов для получения информации');
            showManualsMenu();
            break;
            
        case '2':
            showManualsMenu();
            break;
            
        case '3':
            showInput('Введите запрос для поиска...', 'database');
            break;
            
        case '4':
            showInput('Введите номер телефона (например: 79031234567)', 'phone