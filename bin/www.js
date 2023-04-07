import app from "../app.js";
import customProcess from "../src/configure/custom-process.js";
import ZodiacUniverseModel from "../src/models/zodiac-universe-model.js";

ZodiacUniverseModel.sync().then(() => {
    console.log('Database is ready');
    app.listen(customProcess.env.PORT, () => {
        console.log(`Server is ready at http://localhost:${customProcess.env.PORT}`);
    });
});
