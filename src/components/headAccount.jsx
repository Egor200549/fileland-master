import React from "react";
import '../styles/common.css';
import '../styles/headAccount.css';
import { useNavigate } from "react-router-dom";

const HeadAccount = (props) => {

    let navigate = useNavigate();

    return (
        <div className="headAccount">
            <h1 onClick={() => navigate('/')} className="h1Account">FileLand</h1>
            <div className="dropdown">
                <button className="dropbtn">A</button>
                <div className="dropdown-content">
                    <p>Аккаунт FileLand</p>
                    <p>{props.data.first_name} {props.data.last_name}</p>
                    <p>{props.data.email}</p>
                </div>
            </div>
        </div>
    );
}

export default HeadAccount;