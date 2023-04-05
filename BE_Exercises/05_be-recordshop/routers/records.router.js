import express from 'express';
import { addNewAlbum, getAlbums, searchAlbums } from '../controllers/records.controller.js';
export const recordRouter = express.Router();

recordRouter.route('/album')
    .post(addNewAlbum)
    .get(getAlbums)

recordRouter.route('/album/search')
    .get(searchAlbums)