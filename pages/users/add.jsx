import { Layout } from "../../components";
import { AddEdit } from "../../components/users";

export default Add;

function Add() {
    return (
        <Layout>
            <h1>Ajouter un utilisateur</h1>
            <AddEdit />
        </Layout>
    );
}
