import express from "express";
import CustomLogger from "../configure/CustomLogger.js";
import * as errors from "../errors/CustomError.js";

const {Request, Response} = express;
const {CustomError} = errors;


export default class ExceptionRouter {
    static #instance;
    #logger;

    constructor({
                    _logger = new CustomLogger(),
                } = {}) {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;

        this.#logger = _logger;
    }

    /**
     * @param {CustomError} err
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    errorHandler = async (err, req, res, next) => {
        this.#logger.error(err.stack);

        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';

        res.status(statusCode).send(message);
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    notFound = async (req, res) => {
        res.status(404).send('Page not found');
    }
}