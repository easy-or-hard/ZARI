import express from "express";
import ZodiacUniverseService from "../services/ZodiacUniverseService.js";
const { Request, Response, NextFunction } = express;

export default class ZodiacUniverseController {
    /**
     * @type {ZodiacUniverseController}
     * @protected
     */
    static #instance;

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;
    }

    /**
     * zodiac universe creates
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {Promise<void>}
     */
    async create(req, res, next) {
        const {status, result} = await ZodiacUniverseService.findByPk(req.body.name);
        res.status(status).send(result);
    }

    /**
     * zodiac universe reads
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {Promise<void>}
     */
    async findAll(req, res, next) {
        const {status, result} = await ZodiacUniverseService.findAll();
        res.status(status).send(result);
    }

    /**
     * zodiac universe read one
     * if not found, next route
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {Promise<void>}
     */
    async findByPk(req, res, next) {
        const name = req.params.name;
        const {status, result} = await ZodiacUniverseService.findByPk(name);
        res.status(status).send(result);
    };
}