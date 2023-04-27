import express from 'express';
import CustomLogger from "./CustomLogger.js";

export default class CustomExpress {
    static #instance;
    #express;
    #logger;

    constructor({
                    _express = express(),
                    _logger = new CustomLogger(),
                } = {}) {
        if (CustomExpress.#instance) {
            return CustomExpress.#instance;
        }
        CustomExpress.#instance = this;
        this.#express = _express;
        this.#logger = _logger;
    }

    get json() {
        this.#logger.info('익스프레스 JSON 설정');
        return express.json();
    }

    get urlencoded() {
        this.#logger.info('익스프레스 URL 인코딩 설정');
        return express.urlencoded({ extended: false });
    }

    get static() {
        const root = 'public';
        const staticOptions = {
            dotfiles: 'ignore',
            etag: false,
            extensions: ['htm', 'html'],
            index: false,
            maxAge: '1d',
            redirect: false,
        };

        this.#logger.info('익스프레스 정적 파일 설정', root, staticOptions);
        return express.static(root, staticOptions);
    }
}