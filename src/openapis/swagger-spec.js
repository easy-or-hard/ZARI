import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import customProcess from "../configure/custom-process.js";


export default new class SwaggerSpec {
    static #instance;
    static #options = {
        encoding: 'utf8',
        failOnErrors: false,
        verbose: false,
        format: '.json',
        swaggerDefinition: {
            openapi: "3.0.0",
            info: {
                title: "Zodiac Universe API",
                version: "1.0.0",
                description: "A simple API to manage zodiac universes",
            },
            servers: [
                {
                    url: `http://localhost:${customProcess.env.PORT}/api`,
                },
            ],
        },
        definition: {}, // do not use this, instead use swaggerDefinition field
        apis: ["./src/routes/*.js"]
    };

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;
    }

    get server() {
        return swaggerUi.serve;
    }

    setup() {
        const swaggerSpec = swaggerJsdoc(this.constructor.#options);
        return swaggerUi.setup(swaggerSpec);
    }
}