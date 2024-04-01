import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { addTrack } from '../services/api';

import '../assets/style/addTrack.css';

const AddTrack = () => {
    const [trackInfo, setTrackInfo] = useState({
        number: 1,
        title: '',
        duration: 0,
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTrackInfo((prevTrackInfo) => ({
            ...prevTrackInfo,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!trackInfo.number || !trackInfo.title || !trackInfo.duration) {
            setErrorMessage('Por favor, preencha todos os campos.');
            return;
        }

        if (isNaN(trackInfo.duration)) {
            setErrorMessage('Por favor, insira uma duração válida.');
            return;
        }

        try {
            await addTrack(id, trackInfo);
            navigate(`/album/${id}`);
            setSuccessMessage('Faixa adicionada com sucesso!');
            setTimeout(() => {
                setSuccessMessage('');
                setTrackInfo({
                    number: 1,
                    title: '',
                    duration: 0,
                });
            }, 2000);
        } catch (error) {
            console.error('Error adding track:', error);
            setErrorMessage('Ocorreu um erro ao adicionar a faixa. Por favor, tente novamente.');
        }
    };

    return (
        <div className="add-track-container">
            <h2>Adicionar Nova Faixa</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit} className="track-form">
                <div className="input-container">
                    <label htmlFor="number">Número da Faixa:</label>
                    <input
                        type="number"
                        id="number"
                        name="number"
                        value={trackInfo.number}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="title">Título da Faixa:</label>
                    <input
                        type="text"
                        placeholder='Nome da Musica...'
                        id="title"
                        name="title"
                        value={trackInfo.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="duration">Duração (segundos):</label>
                    <input
                        type="number"
                        id="duration"
                        name="duration"
                        value={trackInfo.duration}
                        onChange={handleChange}
                    />
                </div>
                <div className="button-container">
                    <button type="submit">Adicionar Faixa</button>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default AddTrack;