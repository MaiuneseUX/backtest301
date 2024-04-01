import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import '../assets/style/search.css';

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const location = useLocation();
    const showSearch = location.pathname !== '/' && !location.pathname.startsWith('/search/')

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
        setErrorMessage('');
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();

        if (!searchTerm) {
            setErrorMessage('Por favor, digite um termo de busca.');
        } else {
            window.location.href = `/search/${searchTerm}`;
        }
    };

    useEffect(() => {
        if (errorMessage) {
            const displayTime = 2000;

            const timeout = setTimeout(() => {
                setErrorMessage('');
            }, displayTime);

            return () => clearTimeout(timeout);
        }
    }, [errorMessage]);

    return (
        <div className="search">
            {!showSearch && (
                <div className="search-form">
                    <label>Digite a palavra chave: </label>
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Search Buscar álbuns por nome..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        {errorMessage &&
                            <>
                                <button>Buscar Álbum</button>
                                <p className="error-message">{errorMessage}</p>
                            </>
                        }
                        {!errorMessage && <button>Buscar Álbum</button>}
                    </form>
                </div>
            )}
        </div>
    )
}