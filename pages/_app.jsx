import '../styles/global.css';
import { Nav, Alert } from '../components';
import 'bootstrap/dist/css/bootstrap.min.css';

export default App;

function App({ Component, pageProps }) {
    return (
        <>
            <Nav />
            <Alert />
            <Component {...pageProps} />
        </>
    );
}