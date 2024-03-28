import { useRef, useState } from 'react';
import '../styles/common.css';
import '../styles/sign_in.css'
import { useEffect } from 'react';
import person from '../images/user.png';
import lock from '../images/lock.png';
import { useNavigate } from 'react-router-dom';

const Sign_in = () => {

    let sign_in = useRef();
    let sign_up = useRef();
    let sign_in_form = useRef();
    let sign_up_form = useRef();

    const show_sign_in_form = () => {
        sign_in.current.classList.add('checked');
        sign_in_form.current.style.display = 'flex';
        sign_up.current.classList.remove('checked');
        sign_up_form.current.style.display = 'none';
    };

    const show_sign_up_form = () => {
        sign_up.current.classList.add('checked');
        sign_up_form.current.style.display = 'flex';
        sign_in.current.classList.remove('checked');
        sign_in_form.current.style.display = 'none';
    };

    let [email, setEmail] = useState();
    let emailRef = useRef();
    let messageEmail = useRef();

    let [password, setPassword] = useState();
    let passwordRef = useRef();
    let messagePassword = useRef();

    let [firstname, setFirstname] = useState();
    let firstnameRef = useRef();
    let messageFirstname = useRef();

    let [lastname, setLastname] = useState();
    let lastnameRef = useRef();
    let messageLastname = useRef();

    let [email_up, setEmailUp] = useState();
    let emailUpRef = useRef();
    let messageEmailUp = useRef();

    let [password_up, setPasswordUp] = useState();
    let passwordUpRef = useRef();
    let messagePasswordUp = useRef();

    let log_in_message = useRef();
    let registration_message = useRef();

    let checkEmailValue;
    let checkPasswordValue;

    let checkFirstnameValue;
    let checkLastnameValue;
    let checkEmailUpValue;
    let checkPasswordUpValue;

    let loader = useRef();
    let heads = useRef();
    let inner_part = useRef();
    let form_part = useRef();

    let navigate = useNavigate();

    const checkEmail = () => {
        if (!email) {
            emailRef.current.style.background = 'pink';
            messageEmail.current.style.display = 'block';
            messageEmail.current.innerText = 'Заполните поле';
            checkEmailValue = false;
        } else {
            let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
                emailRef.current.style.background = 'pink';
                messageEmail.current.style.display = 'block';
                messageEmail.current.innerText = 'Содержимое поля должно иметь вид example@mail.ru';
                checkEmailValue = false;
            } else {
                emailRef.current.style.background = 'transparent';
                messageEmail.current.style.display = 'none';
                messageEmail.current.innerText = '';
                checkEmailValue = true;
            }
        }
    };

    const checkPassword = () => {
        if (!password) {
            passwordRef.current.style.background = 'pink';
            messagePassword.current.style.display = 'block';
            messagePassword.current.innerText = 'Заполните поле';
            checkPasswordValue = false;
        } else {
            passwordRef.current.style.background = 'transparent';
            messagePassword.current.style.display = 'none';
            messagePassword.current.innerText = '';
            checkPasswordValue = true;
        }
    };

    const log_in = (event) => {
        event.preventDefault();

        log_in_message.current.style.display = 'none';

        checkEmail();
        checkPassword();

        if (checkEmailValue && checkPasswordValue) {

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "email": email,
                "password": password
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch("https://m2-chernaev.xn--80ahdri7a.site/authorization", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.success == true) {
                        localStorage.token = result.token;
                        loader.current.style.display = 'block';
                        inner_part.current.style.display = 'none';
                        heads.current.style.display = 'none';
                        form_part.current.style.height = 'calc(100vh - 72px)';
                        form_part.current.style.justifyContent = 'center';
                        setTimeout(() => navigate('/disk'), Math.floor(Math.random() * 3500) + 1000);
                    } else {
                        log_in_message.current.style.display = 'block';
                    }
                })
                .catch((error) => console.error(error));
        }
    };

    const checkFirstname = () => {
        if (!firstname) {
            firstnameRef.current.style.background = 'pink';
            messageFirstname.current.style.display = 'block';
            messageFirstname.current.innerText = 'Заполните поле';
            checkFirstnameValue = false;
        } else {
            firstnameRef.current.style.background = 'transparent';
            messageFirstname.current.style.display = 'none';
            messageFirstname.current.innerText = '';
            checkFirstnameValue = true;
        }
    };

    const checkLastname = () => {
        if (!lastname) {
            lastnameRef.current.style.background = 'pink';
            messageLastname.current.style.display = 'block';
            messageLastname.current.innerText = 'Заполните поле';
            checkLastnameValue = false;
        } else {
            lastnameRef.current.style.background = 'transparent';
            messageLastname.current.style.display = 'none';
            messageLastname.current.innerText = '';
            checkLastnameValue = true;
        }
    };

    const checkEmailUp = () => {
        if (!email_up) {
            emailUpRef.current.style.background = 'pink';
            messageEmailUp.current.style.display = 'block';
            messageEmailUp.current.innerText = 'Заполните поле';
            checkEmailUpValue = false;
        } else {
            let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email_up)) {
                emailUpRef.current.style.background = 'pink';
                messageEmailUp.current.style.display = 'block';
                messageEmailUp.current.innerText = 'Содержимое поля должно иметь вид example@mail.ru';
                checkEmailUpValue = false;
            } else {
                emailUpRef.current.style.background = 'transparent';
                messageEmailUp.current.style.display = 'none';
                messageEmailUp.current.innerText = '';
                checkEmailUpValue = true;
            }
        }
    };

    const checkPasswordUp = () => {
        if (!password_up) {
            passwordUpRef.current.style.background = 'pink';
            messagePasswordUp.current.style.display = 'block';
            messagePasswordUp.current.innerText = 'Заполните поле';
            checkPasswordUpValue = false;
        } else {
            let pattern = new RegExp(/^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,})$/i);
            if (!pattern.test(password_up)) {
                passwordUpRef.current.style.background = 'pink';
                messagePasswordUp.current.style.display = 'block';
                messagePasswordUp.current.innerText = 'Пароль должен соответствовать требованиям ниже';
                checkPasswordUpValue = false;
            } else {
                passwordUpRef.current.style.background = 'transparent';
                messagePasswordUp.current.style.display = 'none';
                messagePasswordUp.current.innerText = '';
                checkPasswordUpValue = true;
            }
        }
    };

    const register = (event) => {
        event.preventDefault();

        checkFirstname();
        checkLastname();
        checkEmailUp();
        checkPasswordUp();

        if (checkFirstnameValue && checkLastnameValue && checkEmailUpValue && checkPasswordUpValue) {

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "first_name": firstname,
                "last_name": lastname,
                "email": email_up,
                "password": password_up
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch("https://m2-chernaev.xn--80ahdri7a.site/registration", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    if (result.success == true) {
                        localStorage.token = result.token;
                        loader.current.style.display = 'block';
                        inner_part.current.style.display = 'none';
                        heads.current.style.display = 'none';
                        form_part.current.style.height = 'calc(100vh - 72px)';
                        form_part.current.style.justifyContent = 'center';
                        setTimeout(() => navigate('/disk'), Math.floor(Math.random() * 3500) + 1000);
                    } else {
                        registration_message.current.style.display = 'block';
                    }
                })
                .catch((error) => console.error(error));
        }
    };

    useEffect(show_sign_in_form, []);

    return (
        <div ref={form_part} className='form_part'>
            <div ref={heads} className="heads">
                <h2 className='head' ref={sign_in} onClick={show_sign_in_form}>Вход</h2>
                <h2 style={{ fontSize: '40px' }}>|</h2>
                <h2 className='head' ref={sign_up} onClick={show_sign_up_form}>Регистрация</h2>
            </div>

            <div ref={inner_part} className="inner_part">
                <form ref={sign_in_form} onSubmit={(event) => log_in(event)} noValidate>
                    <div className='input_block'>
                        <img src={person} alt='icon' />
                        <input ref={emailRef} onChange={(event) => setEmail(event.target.value)} className='input' type='email' id='email' autoComplete='off' placeholder='Введите email' />
                    </div>
                    <div className='messageEmail' ref={messageEmail}></div>
                    <div className='input_block'>
                        <img src={lock} alt='icon' />
                        <input ref={passwordRef} onChange={(event) => setPassword(event.target.value)} className='input' type='password' id='password' autoComplete='off' placeholder='Введите пароль' />
                    </div>
                    <div className='messagePassword' ref={messagePassword}></div>
                    <div className='log_in_message' ref={log_in_message}>Неверный логин или пароль</div>
                    <button type='submit' className='sign_in'>Войти</button>
                    <div className="post_scriptum">
                        <p>Нет аккаунта?</p>
                        <button type='button' onClick={show_sign_up_form}>Зарегистрироваться</button>
                    </div>
                </form>

                <form ref={sign_up_form} onSubmit={(event) => register(event)} noValidate>
                    <div className='input_block'>
                        <img src={person} alt='icon' />
                        <input ref={firstnameRef} onChange={(event) => setFirstname(event.target.value)} className='input' type='text' id='firstname' autoComplete='off' placeholder='Введите имя' />
                    </div>
                    <div className='messageFirstname' ref={messageFirstname}></div>
                    <div className='input_block'>
                        <img src={person} alt='icon' />
                        <input ref={lastnameRef} onChange={(event) => setLastname(event.target.value)} className='input' type='text' id='lastname' autoComplete='off' placeholder='Введите фамилию' />
                    </div>
                    <div className='messageLastname' ref={messageLastname}></div>
                    <div className='input_block'>
                        <img src={person} alt='icon' />
                        <input ref={emailUpRef} onChange={(event) => setEmailUp(event.target.value)} className='input' type='email' id='email_up' autoComplete='off' placeholder='Введите email' />
                    </div>
                    <div className='messageEmailUp' ref={messageEmailUp}></div>
                    <div className='input_block'>
                        <img src={lock} alt='icon' />
                        <input ref={passwordUpRef} onChange={(event) => setPasswordUp(event.target.value)} className='input' type='password' id='password_up' autoComplete='off' placeholder='Введите пароль*' />
                    </div>
                    <div className='messagePasswordUp' ref={messagePasswordUp}></div>
                    <div style={{ marginTop: '10px' }}>*пароль должен состоять минимум из 8 символов, из которых как минимум одна строчная, одна прописная латинские буквы, одна цифра и один специальный символ</div>
                    <div className='registration_message' ref={registration_message}>Вы уже зарегистрированы</div>
                    <button type='submit' className='sign_out'>Зарегистрироваться</button>
                    <div className="post_scriptum">
                        <p>Уже есть аккаунт?</p>
                        <button type='button' onClick={show_sign_in_form}>Войти</button>
                    </div>
                </form>
            </div>
            <div ref={loader} className="loader"></div>
        </div>
    );
}

export default Sign_in;