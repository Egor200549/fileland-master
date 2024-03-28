import React, { useEffect, useState } from "react";
import '../styles/disk.css';
import '../styles/common.css';
import File from "./file";

const Disk = (props) => {

    let author;
    let [files, setFiles] = useState([]);

    const onload = () => {

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
                setFiles(result[1]);
            })
            .catch((error) => console.error(error));

        if (!files[0]) return;
        if (props.data.email == files[0].accesses[0].email) {
            author = 1;
        } else {
            author = 0;
        };
        for (var file in files) {
            files[file].writer = author;
        }
    };

    const delete_file = (id) => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.token);

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("https://m2-chernaev.xn--80ahdri7a.site/files/" + id, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.success == true) {
                    setFiles((files) => files.filter((file) => file.file_id !== id));
                }
            })
            .catch((error) => console.error(error));
    };

    const sort_name_asc = () => {
        //let sorted = files.sort((a, b) => { if (a['name'] > b['name']) return -1 });
    };

    const sort_date_asc = () => {
        //setFiles(files.sort((a, b) => a.date - b.date));
    };

    useEffect(onload, []);

    return (
        <div className="disk">
            <div className="diskMenu">
                <div className="disk_menu">
                    <button className="disk_menu_item">Название &#9660;</button>
                    <div className="disk_menu_content">
                        <button onClick={sort_name_asc} className="disk_menu_button">А-я</button>
                        <button className="disk_menu_button">Я-а</button>
                    </div>
                </div>
                <div className="disk_menu">
                    <button className="disk_menu_item">Тип &#9660;</button>
                    <div className="disk_menu_content">
                        <button className="disk_menu_button">Документы</button>
                        <button className="disk_menu_button">Изображения</button>
                        <button className="disk_menu_button">Файлы</button>
                    </div>
                </div>
                <div className="disk_menu">
                    <button className="disk_menu_item">Автор &#9660;</button>
                    <div className="disk_menu_content">
                        <button className="disk_menu_button">Автор</button>
                        <button className="disk_menu_button">Автор</button>
                        <button className="disk_menu_button">Автор</button>
                    </div>
                </div>
                <div className="disk_menu">
                    <button className="disk_menu_item">Дата &#9660;</button>
                    <div className="disk_menu_content">
                        <button onClick={sort_date_asc} className="disk_menu_button">По возрастанию</button>
                        <button className="disk_menu_button">По убыванию</button>
                    </div>
                </div>
            </div>
            <div className="files">
                <div className="head_files">
                    <p className="head_files_name">Название</p>
                    <p className="head_files_date">Дата</p>
                    <p className="head_files_owner">Владелец</p>
                    <p className="head_files_place">Местоположение</p>
                    <button className="head_files_button">&#8285;</button>
                </div>
                {files && files.map((item, index) => <File key={index} file={item} onDeleted={delete_file} />)}
            </div>
        </div>
    );
}

export default Disk;