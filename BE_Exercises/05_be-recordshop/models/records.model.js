import mongoose, { Schema, model } from 'mongoose';

//track schema
const trackSchema = new Schema({
    title: String,
    duration: Number
});


//create schema for Album
const albumSchema = new Schema({
    title: { type: String, required: [true, 'Album\' title is required!'] },
    artist: { type: String },
    releaseDate: { type: Date },
    price: { type: Number },
    tracks: [trackSchema]
});


export const Album = model('Album', albumSchema);
// export const Track = model('Track', trackSchema);
