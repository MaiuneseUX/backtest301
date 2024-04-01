import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAlbums, deleteAlbum, getKeywordAlbum } from '../services/api';
import TrackList from './TrackList';

import '../assets/style/albumList.css';

const AlbumList = () => {
    const [albums, setAlbums] = useState([]);
    const { searchTerm } = useParams();

    useEffect(() => {
        fetchAlbums();
    }, [searchTerm]);

    const fetchAlbums = async () => {
        try {
            let response;
            if (searchTerm) {
                response = await getKeywordAlbum(searchTerm);
            } else {
                response = await getAlbums();
            }
            setAlbums(response.data.data);
        } catch (error) {
            console.error('Error fetching albums:', error);
        }
    };

    const handleDeleteAlbum = async (id) => {
        try {
            await deleteAlbum(id);
            fetchAlbums();
        } catch (error) {
            console.error('Error deleting album:', error);
        }
    };

    return (
        <div className="album-list">
            <h2>Lista de Álbuns</h2>
            {albums.length > 0 ? (
                albums.map((album) => (
                    <div key={album.id}>
                        <div className='album-list-title'>
                            <h3>{album.name}, {album.year}</h3>
                            <Link to={`/album/${album.id}`}>Adicionar Faixa</Link>
                            <button onClick={() => handleDeleteAlbum(album.id)}>Excluir Album</button>
                        </div>
                        <TrackList albumId={album.id} />
                    </div>
                ))
            ) : (
                <p>Nenhum álbum encontrado com o termo: {searchTerm}.</p>
            )}
        </div>
    );
};

export default AlbumList;