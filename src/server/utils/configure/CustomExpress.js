import express from 'express';

export default class CustomExpress {
    static #instance;
    #express;

    constructor(
        express = express()
        ) {
        if (CustomExpress.#instance) {
            return CustomExpress.#instance;
        }
        CustomExpress.#instance = this;
        this.#express = express;
    }

    json = () => {
        this.#express.use(express.json());
    }

    urlencoded = () => {
        this.#express.use(express.urlencoded({ extended: false }));
    }

    static = () => {
        let staticOptions = {
            dotfiles: 'ignore',
            etag: false,
            extensions: ['htm', 'html'],
            index: false,
            maxAge: '1d',
            redirect: false,
        };
        this.#express.use(express.static('public', staticOptions));
    }
}