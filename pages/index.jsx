import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { Card, ListGroup } from 'react-bootstrap';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Freshcore manage users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Card style={{width: 600, margin: '0 auto', marginTop: '5rem'}} className="d-flex">
            <Card.Header>
              <h3>Informations du site</h3>
            </Card.Header>
            <Card.Body>
              <p>Site de gestion utilisateur basé sur un fichier JSON.</p>
              <p>Ce site est réalisé avec REACT et Nextjs.</p>
              <p>Thème basé sur react-bootstrap.</p>
            </Card.Body>
        </Card>
        <Card style={{width: 600, margin: '0 auto', marginTop: '10px'}} className="d-flex">
            <Card.Header>
              <h3>Fonctionnalités</h3>
            </Card.Header>
            <Card.Body>
             <ListGroup>
                <ListGroup.Item>
                  <Link className="btn btn-primary" href="/users">Liste des utilisateurs</Link>
                </ListGroup.Item>
                <ListGroup.Item> 
                  <Link className="btn btn-primary" href="/users/add">Ajouter un utilisateur</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link className="btn btn-primary" href="/users">Modifier un utilisateur</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link className="btn btn-primary" href="/users">Supprimer un utilisateur</Link>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
        </Card>
      </main>
    </div>
  );
}
