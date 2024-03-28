import React, { useRef, useState } from "react";
import '../styles/common.css';
import '../styles/file.css';

const File = ({ file, onDeleted }) => {

    let date = file.date.substr(8, 2) + '-' + file.date.substr(5, 2) + '-' + file.date.substr(0, 4);
    let author = (file.writer = 1) ? "Я" : "Другой автор";
    let place = (file.writer = 1) ? "Мой диск" : "Доступно мне";

    let ref = useRef();
    let but_addition = useRef();
    let but_cancel = useRef();
    let options = useRef();
    let but_delete = useRef();

    let attempt = true;
    let clicked = false;

    const download = (id, name) => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.token);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("https://m2-chernaev.xn--80ahdri7a.site/files/" + id, requestOptions)
            .then((response) => response.blob())
            .then((result) => {
                let url = URL.createObjectURL(result);
                let anchor = document.createElement('a');
                anchor.href = url;
                anchor.download = name;
                document.body.append(anchor);
                anchor.style.display = 'none';
                anchor.click();
                anchor.remove();
            })
            .catch((error) => console.error(error));
    };

    const attempt_delete = (id) => {
        ref.current.classList.add('attempt_delete');
        but_addition.current.classList.add('none');
        options.current.classList.add('none');
        but_cancel.current.classList.remove('none');

        let interval = setInterval(() => {
            delete_file(id, timeout, timeoutClicked);
        }, 500);

        let timeout = setTimeout(() => {
            clearInterval(interval);
        }, 5000);

        let timeoutClicked = setTimeout(() => {
            clicked = true;
        }, 4800);
    };

    const delete_file = (id, timeout, timeoutClicked) => {
        if (clicked) {
            if (attempt) {
                onDeleted(id);
            } else {
                attempt = true;
                clicked = false;
                ref.current.classList.remove('attempt_delete');
                but_addition.current.classList.remove('none');
                options.current.classList.remove('none');
                but_cancel.current.classList.add('none');
                clearTimeout(timeout);
                clearTimeout(timeoutClicked);
            }
        }
    };

    return (
        <div className="file" ref={ref}>
            <p title={file.name} className="file_name">{file.name}</p>
            <p title={date} className="file_date">{date}</p>
            <p title={author} className="file_owner">{author}</p>
            <p title={place} className="file_place">{place}</p>
            <div className="addition">
                <button ref={but_addition} className="file_button">&#8285;</button>
                <button title="Отменить" ref={but_cancel} onClick={() => {attempt = false; clicked = true}} className="file_button none">&#x2715;</button>
                <div className="options" ref={options}>
                    <button onClick={() => download(file.file_id, file.name)} className="option">Скачать</button>
                    {(file.writer = 1) ? <button className="option">Редактировать</button> : null}
                    {(file.writer = 1) ? <button ref={but_delete} onClick={() => attempt_delete(file.file_id)} className="option">Удалить</button> : null}
                </div>
            </div>
        </div>
    );
}

export default File;