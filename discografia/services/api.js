import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: apiUrl,
    headers: {
        Authorization: apiKey,
        'Content-type': 'application/json',
    },
});

export const getAlbums = () => {
    return api.get(`/album`);
};

export const getKeywordAlbum = (keyword, limit = 10, page = 1) => {
    return api.get(`/album?keyword=${keyword}&limit=${limit}&page=${page}`);
};

export const createAlbum = (name, year) => {
    return api.post('/album', { name, year });
};

export const deleteAlbum = (id) => {
    return api.delete(`/album/${id}`);
};

export const addTrack = (album_id, trackInfo) => {
    return api.post('/track', { album_id, ...trackInfo });
};

export const deleteTrack = (id) => {
    return api.delete(`/track/${id}`);
};
