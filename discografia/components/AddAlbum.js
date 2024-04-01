import React, { useState } from 'react';
import { createAlbum } from '../services/api';

import '../assets/style/addAlbum.css';

const AddAlbum = () => {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !year) {
            setErrorMessage('Por favor, preencha todos os campos.');
            return;
        }

        if (isNaN(year)) {
            setErrorMessage('Por favor, insira um ano válido.');
            return;
        }

        try {
            await createAlbum(name, Number(year));
            setName('');
            setYear('');
            setErrorMessage('');
            setSuccessMessage('Álbum adicionado com sucesso!');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error adding album:', error);
            setErrorMessage('Ocorreu um erro ao adicionar o álbum. Por favor, tente novamente.');
        }
    };


    return (
        <div className="add-album-container">
            <h2>Adicionar Álbum</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome do Álbum"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Ano do Álbum"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                />
                <button type="submit">Adicionar</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default AddAlbum;