// Тут все для работы с тестами
const TestController = require('../controllers/test.controller');
const MiddlewareUtils = require('../utils/middleware.utils');
const express = require('express');
const router = express.Router();

router.get('/', MiddlewareUtils.validateUser, TestController.getTests); // Получение теста
router.get('/results', MiddlewareUtils.validateUser, TestController.getTestResults); // Получение результата
router.get('/:id', MiddlewareUtils.validateUser, TestController.getTest); // Получение конкретного теста
router.post('/:id/pass', MiddlewareUtils.validateUser, TestController.passTest); // Отправить результаты теста
router.get('/:id/result', MiddlewareUtils.validateUser, TestController.getTestResult); // Получение результатов теста
router.get('/:id/result/details', MiddlewareUtils.validateUser, TestController.getTestWithResults); // Получение деталей результатов теста

module.exports = router;