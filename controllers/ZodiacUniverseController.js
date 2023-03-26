import express from "express";
const { Request, Response, NextFunction } = express;
import ZodiacUniverseModel from '../models/ZodiacUniverseModel.js';

export default class ZodiacUniverseController {
    static #instance;

    constructor() {
        if (ZodiacUniverseController.#instance) {
            return ZodiacUniverseController.#instance;
        }
        ZodiacUniverseController.#instance = this;

        this.zodiacUniverseModel = new ZodiacUniverseModel();
    }

    /**
     * zodiac universe creates
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {Promise<void>}
     */
    create = async (req, res, next) => {
        let result = await this.zodiacUniverseModel.create();
        console.log('controller create');
        res.status(201).send(result);
    }

    /**
     * zodiac universe reads
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @returns {Promise<void>}
     */
    readAll = async (req, res, next) => {
        let result = this.zodiacUniverseModel.readAll();
        console.log('controller readAll');
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
    readById = async (req, res, next) => {
        let zodiacUniverseName = req.params.name;
        let result = this.zodiacUniverseModel.readById(zodiacUniverseName)

        if (!result) {
            return next();
        }

        console.log('controller readById');
        res.status(200).send(result);
    }
}