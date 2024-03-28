import { useEffect, useRef, useState } from 'react';
import '../styles/common.css';
import '../styles/account.css';
import { Link } from 'react-router-dom';
import HeadAccount from '../components/headAccount';
import Disk from '../components/disk';

const Account = () => {

    let loading = useRef();
    let error = useRef();
    let main = useRef();

    let [user, setUser] = useState({});

    const load = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.token);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("https://m2-chernaev.xn--80ahdri7a.site/file/disk", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if ('error' in result) {
                    error.current.style.display = 'flex';
                } else {
                    loading.current.style.display = 'flex';
                    setTimeout(() => {
                        main.current.style.display = 'block';
                    }, 2000);
                    setUser(result[0]);
                }
            })
            .catch((error) => console.error(error));
    };

    useEffect(load, []);

    return (
        <div>
            <div className='preload' ref={main} style={{ display: "none", height: "100vh", background: "var(--link)" }}>
                <HeadAccount data={user} />
                <div className='accountMain'>
                    <div className="left">
                        <button className='menuAccount'>Мой диск</button>
                        <button className='menuAccount'>Доступные мне</button>
                    </div>
                    <div className="right">
                        <Disk data={user}/>
                    </div>
                </div>
            </div>

            <div ref={loading} className="loading">
                <div className="loader1"></div>
            </div>

            <div ref={error} className="error"><p>Для просмотра личного кабинета необходимо&nbsp;</p>
                <Link to={'/'} className='to_sign_in'>войти</Link>
            </div>
        </div>
    );
}

export default Account;