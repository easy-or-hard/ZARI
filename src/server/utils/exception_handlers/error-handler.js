import express from "express";
const { Request, Response, NextFunction } = express;

export default new class ErrorHandling {
    static #instance;

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;
    }

    /**
     *
     * @param {Error} err
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    errorHandler = (err, req, res, next) => {
        console.error(err.stack);

        const statusCode = 500;
        const message = err.message || 'Internal Server Error';

        res.status(statusCode).send(message);
    }
}