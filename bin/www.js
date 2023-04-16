import app from "../app.js";
import customProcess from "../src/server/utils/configure/custom-process.js";
import CustomSequelize from '../src/server/utils/configure/CustomSequelize.js';

// todo: remove demo data
// import demoData from "../src/server/demo/demoData.js";

new CustomSequelize()
    .sync()
    // .sync({force: true})
    // .then(demoData.insertDemoData)
    .then(() => {
    console.log('Database is ready');
    app.listen(customProcess.env.PORT, () => {
        console.log(`Server is ready at ${customProcess.env.HOST}:${customProcess.env.PORT}`);
    });
})
    .catch((error) => {
        console.error(error);
    });