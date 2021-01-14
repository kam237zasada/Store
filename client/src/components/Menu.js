import React from 'react';


function Menu() {
    return (
        <nav className="flex column menu">
            <a href='/' className="nav-element"><div>Pulpit</div></a>
            <a href='/zakupy' className="nav-element"><div>Zakupy</div></a>
            <a href='sprzedaz' className="nav-element"><div>Sprzedaż</div></a>
            <a href='magazyn' className="nav-element"><div>Magazyn</div></a>
            <a href='konfiguracja' className="nav-element"><div>Konfiguracja</div></a>
        </nav>
    )
}

export default Menu