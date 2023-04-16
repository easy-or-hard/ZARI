// Demo data for ZodiacModel
import ZodiacModel from "../MVC/models/zodiac-model.js";
import CommentModel from "../MVC/models/comment-model.js";

let zodiacDemoData = (() => {
    let zodiacs = [];
    let generator = generateZodiacDemoData();
    for (let i = 1; i <= 12; i++) {
        zodiacs.push(generator.next().value);
    }
    return zodiacs;
})();

let commentDemoData = (() => {
    let comments = [];
    let generator = generateCommentDemoData();
    for (let i = 1; i <= 24; i++) {
        comments.push(generator.next().value);
    }
    return comments;
})();

function* generateZodiacDemoData() {
    let i = 1;
    while (true) {
        yield {
            name: `Zodiac${i}`,
            author: `Author${i}`,
        };
        i++;
    }
}

function* generateCommentDemoData() {
    let i = 1;
    while (true) {
        yield {
            content: `Sample comment ${i}`,
        };
        i++;
    }
}

// Function to insert demo data


export default new class DemoData {
    static #instance;

    constructor() {
        if (this.constructor.#instance) {
            return this.constructor.#instance;
        }
        this.constructor.#instance = this;
    }

    async insertDemoData() {
        try {
            // Insert demo data into ZodiacModel
            const zodiacs = await ZodiacModel.bulkCreate(zodiacDemoData);

            // Insert demo data into CommentModel
            const comments = await CommentModel.bulkCreate(commentDemoData);


            // Associate comments with zodiac signs
            for(let i = 0; i < zodiacs.length; i++) {
                await zodiacs[i].addComment(comments[i]); // Zodiac 1 - Sample comment 1
                await zodiacs[i].addComment(comments[i + 1]); // Zodiac 1 - Sample comment 2
            }

            console.log('Demo data inserted successfully');
        } catch (error) {
            console.error('Error inserting demo data:', error);
        }
    }
}
