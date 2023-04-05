import { faker } from "@faker-js/faker";
import {Album} from "../models/records.model.js";

export const seedAlbums = async (minDocs) => {
  try {
    let albums = [];

    // check the number of current albums in db
    const numOfalbumsInDB = await Album.countDocuments();
    if (minDocs < numOfalbumsInDB) {
      return console.log("There are enough User document in DB!");
    }

    // generate sample data
    for (let i = 0; i < minDocs - numOfalbumsInDB; i++) {
      const album = {};
      
        album.title = faker.music.songName();
        album.artist = faker.name.fullName();
        album.price = faker.commerce.price();
        album.releaseDate = faker.date.birthdate();

        album.tracks = []

        let num = Math.floor(Math.random() * 10) + 1;
        for (let i = 0; i < num; i++){
            const track = {
                title: faker.music.songName(),
                duration: faker.commerce.price()
            }
            album.tracks.push(track);
        }

      albums.push(album);
    }

    //insert user documents to db
    await Album.create(albums);
    console.log("Albums document added successfully!");
  } catch (error) {
    console.log(error.message);
  }
};
