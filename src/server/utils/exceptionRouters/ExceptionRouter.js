import express from "express";
import CustomLogger from "../configure/CustomLogger.js";
const { Request, Response, NextFunction } = express;

export default class ExceptionRouter {
    static #instance;
    #logger = new CustomLogger();

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
        this.#logger.error(err.stack);

        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';

        res.status(statusCode).send(message);
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    async notFound (req, res, next)  {
        res.status(404).send('Page not found');
    }
}