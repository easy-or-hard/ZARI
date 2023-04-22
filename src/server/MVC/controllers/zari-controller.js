import express from "express";
import asyncHandler from "express-async-handler";
import ZodiacUniverseService from "../services/zari-service.js";
const { Request, Response } = express;

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
     * @returns {Promise<void>}
     */
    async create(req, res) {
        const zodiacUniverse = await ZodiacUniverseService.create(req.body);
        res.status(201).json(zodiacUniverse);
    }

    /**
     * zodiac universe reads
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    async findAll(req, res) {
        const result = await ZodiacUniverseService.findAll();
        res.status(200).send(result);
    }

    /**
     * zodiac universe read one
     * if not found, next route
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    async findByPk(req, res) {
        const name = req.params.name;
        const result =  await ZodiacUniverseService.findByPk(name);
        res.status(200).send(result);
    };

    /**
     * zodiac universe read all with comment
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    async findAllIncludeComment(req, res) {
        const result = await ZodiacUniverseService.findAllIncludeComment();
        res.status(200).send(result);
    }
}