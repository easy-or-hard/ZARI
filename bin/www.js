import App from "../App.js";
import ZodiacUniverseModel from "../models/ZodiacUniverseModel.js";

ZodiacUniverseModel.sync().then(() => {
    console.log('Database is ready');
    App.listen();
});
