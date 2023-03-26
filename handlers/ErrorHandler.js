import express from "express";
const { Request, Response, NextFunction } = express;

export default class ErrorHandling {
    constructor() {
        // cant new
        if (new.target) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    /**
     *
     * @param {Error} err
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    static errorHandler = (err, req, res, next) => {
        console.error('errorHandler');
        console.error(err.stack);
        res.status(500).send('error!!!!!!!!!');
    }
}