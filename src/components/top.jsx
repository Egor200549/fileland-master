import React from "react";
import '../styles/top.css';
import { Link, useNavigate } from "react-router-dom";

const Top = () => {
    const openNav = () => {
        let widthScreen = document.getElementById("main").getBoundingClientRect().width;
        if (widthScreen <= 650) {
            document.getElementById("mySide").style.width = "100%";
            const mas = document.querySelectorAll('.link');
            mas.forEach(element => {
                element.style.display = 'block';
            });
        } else {
            document.getElementById("mySide").style.width = "260px";
            document.getElementById("main").style.marginLeft = "260px";
            const mas = document.querySelectorAll('.link');
            mas.forEach(element => {
                element.style.display = 'block';
            });
        }
    }

    let navigate = useNavigate();

    return (
        <div id="header" className="header">
            <div className="leftHeader">
                <button onClick={openNav} id="span" style={{ 'fontSize': '24px', 'cursor': 'pointer' }}>&#9776;</button>
                <Link id="menu" to={'/'}>Главная</Link>
                <Link id="menu" to={'/disk'}>Личный кабинет</Link>
                <Link id="menu" to={'/search'}>Поиск</Link>
            </div>
            <div className="rightHeader">
                <Link id="menu" to={'/'}>Перейти в FileLand</Link>
                <Link id="menu" to={'/'}>Попробовать FileLand</Link>
                <h1 onClick={() => navigate('/')} className="h1">FileLand</h1>
            </div>
        </div>

    );
}

export default Top;