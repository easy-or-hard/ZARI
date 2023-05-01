import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import CustomLogger from "../configure/CustomLogger.js";


export default class CustomSwaggerSpec {
    static #instance;
    #logger;

    constructor({
                    logger = new CustomLogger()
                } = {}) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.#logger = logger;
    }

    get serve() {
        return swaggerUi.serve;
    }

    get setup() {
        const options = {
            encoding: 'utf8',
            failOnErrors: false,
            verbose: false,
            format: '.json',
            swaggerDefinition: {
                openapi: "3.0.0",
                info: {
                    title: "ZARI API",
                    version: "1.0.0",
                    description: "A simple API to manage ZARI",
                },
                servers: [
                    {
                        url: '/',
                    },
                ],
            },
            definition: {}, // do not use this, instead use swaggerDefinition field
            apis: ["./src/**/*.js"]
        };
        const swaggerOptions = {
            validatorUrl: null, // Add this line to disable caching
            swaggerOptions: {
                oauth2RedirectUrl: 'http://localhost:3000/auth/github/callback',
            },
        };

        this.#logger.info('스웨거 스펙 설정 완료', options, swaggerOptions);
        return swaggerUi.setup(swaggerJsdoc(options), swaggerOptions);
    }
}