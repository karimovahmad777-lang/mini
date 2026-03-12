// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();
tg.setHeaderColor('#0a0a1a');
tg.setBackgroundColor('#0a0a1a');

// Получаем информацию о пользователе из URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('user') || 'unknown';
const userName = urlParams.get('name') || 'Пользователь';

// Состояние приложения
let currentState = {
    selectedMenu