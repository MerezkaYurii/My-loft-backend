"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMongoConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const getEnvVar_1 = require("utils/getEnvVar");
const initMongoConnection = async () => {
    try {
        const user = (0, getEnvVar_1.getEnvVar)('MONGODB_USER');
        const password = (0, getEnvVar_1.getEnvVar)('MONGODB_PASSWORD');
        const url = (0, getEnvVar_1.getEnvVar)('MONGODB_URL');
        const name = (0, getEnvVar_1.getEnvVar)('MONGODB_DB');
        await mongoose_1.default.connect(`mongodb+srv://${user}:${password}@${url}/${name}?retryWrites=true&w=majority&appName=Cluster0`);
        console.log('Succesfulli connection to database');
    }
    catch (error) {
        if (error instanceof Error) {
            console.log('❌ MongoDB connection error:', error.message);
        }
        else {
            console.error('❌ Unknown error during MongoDB connection');
        }
        throw error;
    }
};
exports.initMongoConnection = initMongoConnection;
//# sourceMappingURL=initMongoConnection.js.map