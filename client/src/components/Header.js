import React from 'react';


function Header({user, signOut}) {
    return(
        <div className="header flex center">
            <p>Panel administracyjny Twojego sklepu</p>
            <div className="flex"><p>Jesteś zalogowany jako {user.login}.</p>
            <button onClick={signOut.bind()}className="button red"><i className="fas fa-power-off"></i></button>
            </div>
        </div>
    )
}



export default Header