import React, { useEffect } from "react";
import './css/Info.css';

export function InfoDispositivo({data}) {
    return (
        <div>
            <label htmlFor="">Modelo: {data.info[2]}</label>
            <label htmlFor="">Software: {data.info[3]}</label>
            <label htmlFor="">Serial: {data.info[4]}</label>
        </div>
    );
}

export default InfoDispositivo