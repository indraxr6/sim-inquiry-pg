import React from 'react';
import { LogoMCP } from '../../assets';
import './Header.css';

function Header() {
    return (
        <>
        <div className="topbar">
            <div className="toggle">
                <img src={LogoMCP} alt="img-mcp" width="60px" height="36px" />
            </div>

            <div className="logoTopbar">
                <label htmlFor="logoTopbar">
                    <h4 className="logotTopbarText">PG Simulator</h4>
                </label>
            </div>
        </div>
        </>
    )
}

export default Header