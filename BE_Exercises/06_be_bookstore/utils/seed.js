import { faker } from "@faker-js/faker";
import { Book } from "../models/books.js";
import { Review } from "../models/reviews.js";


export const addSampleData = async (minDocs) => {
    try {
        const books = [];
        const reviews = [];

        //count docs in books collection
        const curDocsInBooks = await Book.countDocuments();

        //check if docs in db is enough
        if (minDocs <= curDocsInBooks) {
            return console.log('There are enough data in db!');
        }

        for (let i = 0; i < (minDocs - curDocsInBooks); i++){
            const book = {
              title: faker.lorem.words(5),
              author: faker.name.fullName(),
              publish_date: faker.date.past(),
              genre: faker.helpers.arrayElement([
                "fantasy",
                "romance",
                "sience-fiction",
                "mystery",
                "horror",
                "thriller",
                "historical-fiction",
              ]),
                description: faker.lorem.paragraph(),
              price: faker.commerce.price()
            };

            books.push(book);
        }

        //write all books to db
        const booksInDB = await Book.create(books);
        console.log('books added!');


        //add sample reviews
        const curDocsInReviews = await Review.countDocuments();
        if (minDocs <= curDocsInReviews) {
            return console.log('There are enough reviews in db!');
        }

        for (let j = 0; j < (minDocs - curDocsInReviews); j++){
            const review = {
                username: faker.internet.userName(),
                text: faker.lorem.paragraphs(),
                book: (faker.helpers.arrayElement(booksInDB))._id
            };

            reviews.push(review);
        }

        await Review.create(reviews);
        console.log('reviews added!');


    } catch (error) {
        console.error(error.message);
    }
}