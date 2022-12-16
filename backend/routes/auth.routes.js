// Тут все для авторизации
const AuthController = require('../controllers/auth.controller');
const express = require('express');

const router = express.Router();

router.post("/signup", AuthController.signUp); // Регистрация
router.post("/login", AuthController.login); // Вход в систему
router.post("/refresh", AuthController.refresh); // Обновление токена
router.post("/logout", AuthController.logout); // Выход из системы

module.exports = router;