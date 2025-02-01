import './Header.css';
import './fonts/Aston Script.ttf'

const Header = () => {
    return (
        <div className="header">
            <nav className="header__nav">
                <h1 className="Logo">Flavo</h1>
                <ul>
                    <li><a href="#!">Поиск по ингредиентам</a></li>
                    <li><a href="#!">База коктейлей</a></li>
                </ul>

            </nav>
        </div>
    )
}

export default Header;