import React, { useState, useEffect } from 'react';
import { getAlbums, deleteTrack } from '../services/api';

import '../assets/style/trackList.css';

const TrackList = ({ albumId }) => {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        fetchTracks();
    }, [albumId]);

    const fetchTracks = async () => {
        try {
            const response = await getAlbums();
            const filteredAlbum = response.data.data.find((album) => album.id === albumId);
            const filteredTracks = filteredAlbum ? filteredAlbum.tracks : [];
            setTracks(filteredTracks);
        } catch (error) {
            console.error('Error fetching tracks:', error);
        }
    };

    const formatDuration = (durationInSeconds) => {
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = Math.round(durationInSeconds % 60);

        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleDeleteTrack = async (id) => {
        try {
            await deleteTrack(id);
            fetchTracks();
        } catch (error) {
            console.error('Error deleting track:', error);
        }
    };

    return (
        <div>
            <div className='title-track'>
                <p>Nº</p>
                <p>Faixa</p>
                <p>Duração</p>
            </div>
            <ul className='title-list'>
                {tracks.map((track) => (
                    <li key={track.id} className='track-item'>
                        <p>{track.number}.</p>
                        <p>{track.title}</p>
                        <p>{formatDuration(track.duration)} Min</p>
                        <button onClick={() => handleDeleteTrack(track.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrackList;