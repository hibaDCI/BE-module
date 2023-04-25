import { faker } from "@faker-js/faker";
import { Book } from "../models/books.js";
import { Review } from "../models/reviews.js";
import { Author } from "../models/authors.js";


export const addSampleData = async (minDocs) => {
    try {
        const authors = [];
        const books = [];
        const reviews = [];

        //count docs in author collection
        const curDocsInAuthors = await Author.countDocuments();

        //check if docs in db is enough
        if (minDocs <= curDocsInAuthors) {
            return console.log('There are enough authors in db!');
        }

        for (let a = 0; a < (minDocs - curDocsInAuthors); a++){
            const author = {
                name: faker.name.firstName()+ ' '+ faker.name.lastName(),
                birthdate: faker.date.birthdate(),
                email: faker.internet.email(),
                bio: faker.lorem.paragraphs(),
                website: faker.internet.url(),
            }

            authors.push(author);
        }

        //write all authors to db
        const authorsInDB = await Author.create(authors);
        console.log('authors added!');

/* ------------------------------- . ------------------------------ */

        //count docs in books collection
        const curDocsInBooks = await Book.countDocuments();

        //check if docs in db is enough
        if (minDocs <= curDocsInBooks) {
            return console.log('There are enough books in db!');
        }

        for (let i = 0; i < (minDocs - curDocsInBooks); i++){
            const book = {
              title: faker.lorem.words(5),
              authors: (faker.helpers.arrayElement(authorsInDB))._id,
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

/* ------------------------------- . ------------------------------ */
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