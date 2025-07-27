"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tcp = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const routing_controllers_1 = require("routing-controllers");
const index_1 = require("../app/domain/index");
const index_2 = require("../app/middlewares/index");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Оголошуємо клас Tcp, який реалізує інтерфейс IService
class Tcp {
    constructor() {
        this.routePrefix = '/api'; // Префикс для маршрутов API
        this.server = (0, express_1.default)(); // Экземпляр Express.js // Конструктор, що реалізує шаблон Singleton для класу Tcp
        // Якщо екземпляр ще не створено, зберігаємо посилання на поточний екземпляр
        if (!Tcp.instance) {
            Tcp.instance = this;
        } // Повертаємо посилання на єдиний екземпляр класу
        return Tcp.instance;
    } // Метод для ініціалізації сервісу
    async init() {
        const { server, routePrefix } = this;
        // server.use(upload.single('file'));
        server.use((req, res, next) => {
            console.log('🧩 RAW HEADERS:', req.headers['content-type']);
            next();
        });
        // 🧠 Добавляем поддержку multipart/form-data
        // const upload = multer();
        // server.use(upload.any());
        server.use(express_1.default.json());
        server.use(express_1.default.urlencoded({ extended: true }));
        // Парсимо тіло запиту, потрібно для middlewares
        // server.use(express.json()); // Використовуємо бібліотеку routing-controllers для налаштування маршрутів
        (0, routing_controllers_1.useExpressServer)(server, {
            routePrefix,
            controllers: index_1.controllers,
            middlewares: index_2.middlewares,
            cors: true,
            defaultErrorHandler: false,
            validation: false, // Відключаємо вбудовану валідацію, щоб ми могли перевірити DTO самі всередині контролера
        }); // Повертаємо Promise, який успішно виконується, коли сервер починає слухати порт
        const port = Number(process.env.PORT) || 4000;
        return new Promise((resolve) => {
            server.listen(port, () => {
                console.log(`Tcp service started on port ${port}`);
                return resolve(true);
            });
        });
    }
}
exports.Tcp = Tcp;
//# sourceMappingURL=Tcp.js.map