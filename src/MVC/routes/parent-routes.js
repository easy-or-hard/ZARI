import express from "express";

/**
 * @abstract
 */
export default class ParentRoutes {
    /**
     * @type {ParentRoutes}
     * @protected
     */
    static _instance;

    router= express.Router();

    constructor() {
        if (this.constructor === ParentRoutes) {
            throw new TypeError('Abstract class "AbstractRoute" cannot be instantiated directly.');
        }

        if (this.constructor._instance) {
            return this.constructor._instance;
        }

        this.constructor._instance = this;
    }
}
