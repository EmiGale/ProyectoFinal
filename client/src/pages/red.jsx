import React, {useContext} from 'react';
import Header from '../containers/Header';
import Loading from '../containers/Loading';
import Diagram from './Visualizacion';
import { AuthContext } from './AuthProvider';

function Red() {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <div>
            <div>
                <Header></Header>
            </div>
            <div>
                <Diagram></Diagram>
            </div>
        </div>
    );
}

export default Red;