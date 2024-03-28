import React from "react";
import { Link } from "react-router-dom";
import '../styles/menu.css';

const Menu = () => {
    const closeNav = () => {
        document.getElementById("mySide").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        const mas = document.querySelectorAll('.link');
        mas.forEach(element => {
            element.style.display = 'none';
            element.style.opacity = '0';
        });
    }
    return (
        <div>
            <div id="mySide" className="sidenav">
                <span className="closebtn" onClick={closeNav}>&times;</span>
                <Link className="link" to={'/'}>Главная</Link>
                <Link className="link" to={'/disk'}>Личный кабинет</Link>
                <Link className="link" to={'/search'}>Поиск</Link>
            </div>
        </div>
    );
}

export default Menu;