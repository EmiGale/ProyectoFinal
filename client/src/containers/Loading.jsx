import React from 'react';
import './css/Loading.css'

function Loading() {
    return (
        <div className='mainLoading'>
            <div className="sectionLoader"> 
                <div className="loadingContainer">
                    <div className="loader">
                        <div className="loader1"></div>
                        <div className="loader2"></div>
                    </div>
                </div>
                <div className="textoLoading">
                    <h2>CARGANDO...</h2>
                </div>
            </div>
        </div>
    );
}

export default Loading;