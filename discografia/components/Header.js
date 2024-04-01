import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import '../assets/style/header.css'

import headerImage from '../assets/img/logo.png';

export default function Header() {
    const location = useLocation();
    const showAlbumsLink = location.pathname !== '/' && !location.pathname.startsWith('/search/');
    const showAddAlbumsLink = location.pathname !== '/add';
    const showAddTrackLink = location.pathname !== '/album' && !location.pathname.startsWith('/album/');

    return (
        <div className="header">
            <Link to={'/'}> <img src={headerImage} alt={'Tião & Carreiro'} /> </Link>
            <h1>Gerenciador da Discografia de Tião Carreiro & Pardinho</h1>
            <nav className="navbar">
                <ul>
                    {showAlbumsLink && (
                        <li>
                            <Link to="/" className="button-link">Ver Álbuns</Link>
                        </li>
                    )}
                    {showAddAlbumsLink && showAddTrackLink && (
                        <li>
                            <Link to="/add" className="button-link">Adicionar Álbum</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
}
