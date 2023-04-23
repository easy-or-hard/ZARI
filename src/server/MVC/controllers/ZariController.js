import express from "express";
import asyncHandler from "express-async-handler";
import ZariService from "../services/ZariService.js";
const { Request, Response } = express;

export default class ZariController {
    /**
     * @type {ZariController}
     * @protected
     */
    static #instance;
    #service = new ZariService();

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
        const zodiacUniverse = await this.#service.create(req.body);
        res.status(201).json(zodiacUniverse);
    }

    /**
     * zodiac universe reads
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    async findAll(req, res) {
        const result = await this.#service.findAll();
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
        const result =  await this.#service.findByPk(name);
        res.status(200).send(result);
    };

    /**
     * zodiac universe read all with comment
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    async findAllIncludeComment(req, res) {
        const result = await this.#service.findAllIncludeComment();
        res.status(200).send(result);
    }
}