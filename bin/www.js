import app from "../app.js";
import customProcess from "../src/utils/configure/custom-process.js";
import CustomSequelize from '../src/utils/configure/CustomSequelize.js';

import demoData from "../src/demo/demoData.js";

new CustomSequelize()
    .sync()
    // .sync({force: true})
    // .then(demoData.insertDemoData)
    .then(() => {
    console.log('Database is ready');
    app.listen(customProcess.env.PORT, () => {
        console.log(`Server is ready at http://localhost:${customProcess.env.PORT}`);
    });
})
    .catch((error) => {
        console.error(error);
    });