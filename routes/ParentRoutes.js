import express from "express";
const { Router } = express;

export default class ParentRoutes {
    /**
     * @type {Map<string, T extends ParentRoutes<T>>}
     * @private
     */
    static _instance = new Map();

    /**
     *
     * @type {Router}
     */
    router = express.Router();

    constructor() {
        if (this.constructor === ParentRoutes) {
            throw new TypeError('Abstract class "AbstractRoute" cannot be instantiated directly.');
        }
    }

    /**
     *
     * @returns {Router}
     */
    static get instanceRouter() {
        let classname = this.constructor.name;
        if (this._instance.has(classname)) {
            return this._instance.get(classname).router;
        }

        let instance = new this();
        this._instance.set(classname, instance);
        return instance.router;
    }
}