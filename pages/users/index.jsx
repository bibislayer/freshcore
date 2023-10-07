import { useState, useEffect } from 'react';

import { Layout, Spinner } from '../../components';
import { userService } from '../../services';
import Link from 'next/link';
import { Table } from 'react-bootstrap';

export default Index;

function Index() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        userService.getAll().then(x => setUsers(x));
    }, []);

    function deleteUser(id) {
        if (window.confirm("Voulez vous supprimer cet utilisateur ?")) {
            setUsers(users.map(x => {
                if (x.id === id) { x.isDeleting = true; }
                return x;
            }));
            userService.delete(id).then(() => {
                setUsers(users => users.filter(x => x.id !== id));
            });
        }
    }

    return (
        <Layout>
            <h1>Utilisateurs</h1>
            <Link href="/users/add" className="btn btn-sm btn-success mb-2">Ajouter un utilisateur</Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ width: '5%' }}>Id</th>
                        <th style={{ width: '20%' }}>Prénom</th>
                        <th style={{ width: '20%' }}>Nom</th>
                        <th style={{ width: '30%' }}>Email</th>
                        <th style={{ width: '10%' }}>Genre</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user =>
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.prenom}</td>
                            <td>{user.nom}</td>
                            <td>{user.email}</td>
                            <td>{user.genre}</td>
                            <td style={{ whiteSpace: 'nowrap' }} className="mr-auto">
                                <Link href={`/users/edit/${user.id}`} style={{marginRight: 5}} className="btn btn-sm btn-primary">Modifier</Link>
                                <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={user.isDeleting}>
                                    {user.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Supprimer</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!users &&
                        <tr>
                            <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>
                    }
                    {users && !users.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">Aucun utilisateur à afficher</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </Table>
        </Layout>
    );
}