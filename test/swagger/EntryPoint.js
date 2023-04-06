import express from "express";
import SwaggerSpec from "./SwaggerSpec.js";

export default class EntryPoint {
    static #instance;
    static #express = express();

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.#preProcess();
    }

    #preProcess() {
        this.constructor.#express.use('/api-docs', SwaggerSpec.server, SwaggerSpec.setup());
    }

    start() {
        this.constructor.#express.listen(8080, () => {
            console.log("Server is running on port 8080");
        });
    }
}

new EntryPoint().start();