import express from "express";
const { Request, Response, NextFunction } = express;

export default class NotFoundHandler {
    constructor() {
        // cant new
        if (new.target) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    static notFound = (req, res, next) => {
        res.status(404).send('Page not found');
    }
}