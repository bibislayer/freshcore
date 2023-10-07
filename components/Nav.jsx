import { NavLink } from 'react-bootstrap';

export { Nav };

function Nav() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink href="/" exact className="nav-item nav-link">Accueil</NavLink>
                <NavLink href="/users" className="nav-item nav-link">Utilisateurs</NavLink>
            </div>
        </nav>
    );
}
