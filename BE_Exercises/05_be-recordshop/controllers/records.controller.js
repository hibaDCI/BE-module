import { Album } from "../models/records.model.js";

export const addNewAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseDate, price, tracks } = req.body;

    const newAlbum = new Album({ title, artist, releaseDate, price, tracks });
    newAlbum.save();

    res.status(201).json({
      message: "Album created",
      newAlbum,
    });
  } catch (error) {
    next(error);
  }
};

export const getAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find();
    res.status(200).json({
      message: "list of albums",
      albums,
    });
  } catch (error) {
    next(error);
  }
};

export const searchAlbums = async (req, res, next) => {
  try {
    const regex = new RegExp(req.body.title, "i");
    const resultSet = await Album.find({ title: regex });

    res.status(200).json({
      message: "retreive data successfully!",
      result: resultSet,
    });
  } catch (error) {
    next(error);
  }
};
