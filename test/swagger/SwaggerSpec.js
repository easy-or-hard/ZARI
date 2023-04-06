import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

export default new class SwaggerSpec {
    static #instance;
    static #options = {
        swaggerDefinition: {
            openapi: "3.0.0",
            info: {
                title: "Zodiac Universe API",
                version: "1.0.0",
                description: "A simple API to manage zodiac universes",
            },
            servers: [
                {
                    url: "http://localhost:8080",
                },
            ],
        },
        apis: ["./routes/*.js"],
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