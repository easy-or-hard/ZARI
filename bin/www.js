import app from "../app.js";
import customProcess from "../src/utils/configure/custom-process.js";
import CustomSequelize from '../src/utils/configure/CustomSequelize.js';


new CustomSequelize().sync().then(() => {
    console.log('Database is ready');
    app.listen(customProcess.env.PORT, () => {
        console.log(`Server is ready at http://localhost:${customProcess.env.PORT}`);
    });
})
    .catch((error) => {
        console.error(error);
    });