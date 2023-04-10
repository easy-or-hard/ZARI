import express from "express";
const { Request, Response, NextFunction } = express;

export default new class NotFoundHandler {
    static #instance;
    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    notFound = (req, res, next) => {
        res.status(404).send('Page not found');
    }
}