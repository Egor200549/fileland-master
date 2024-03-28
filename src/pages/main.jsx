import '../styles/common.css';
import '../styles/main.css';
import Header_menu from '../components/header_menu';
import Sign_in from '../components/form_sign_in';

const Main = () => {
    return (
        <div>
            <Header_menu />
            <div id="main">
                <Sign_in/>
            </div>
        </div>
    );
}

export default Main;