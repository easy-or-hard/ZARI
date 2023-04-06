import express from "express";
import asyncHandler from "express-async-handler";
import ZodiacUniverseService from "../services/ZodiacUniverseService.js";
const { Request, Response, NextFunction } = express;

export default new class ZodiacUniverseController {
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

        this.findByPk = asyncHandler(this.findByPk.bind(this));
        this.create = asyncHandler(this.create.bind(this));
        this.findAll = asyncHandler(this.findAll.bind(this));
    }

    /**
     * zodiac universe creates
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {Promise<void>}
     */
    async create(req, res, next) {
        const zodiacUniverse = await ZodiacUniverseService.create(req.body);
        res.status(201).json(zodiacUniverse);
    }

    /**
     * zodiac universe reads
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {Promise<void>}
     */
    async findAll(req, res, next) {
        const result = await ZodiacUniverseService.findAll();
        res.status(200).send(result);
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
        const result =  await ZodiacUniverseService.findByPk(name);
        res.status(200).send(result);
    };
}