import React from "react";
import { MdOutlineAccountBalanceWallet as Ewallet, MdOutlineAccountBalance as Virtual} from "react-icons/md/";
import { useNavigate } from "react-router-dom";
import "../Button/Button.css";

function Buttonselect({ tittle }) {
    const navigate = useNavigate();
    const selectMethod = () => {   
        tittle === "E-Wallet" ? navigate("/ewallet") : navigate("/va");      
    };

    return (
        <div>
            <button className="btnAddTransaction" onClick={() => selectMethod()}>
                {tittle === "E-Wallet" ? (
                    <Ewallet size={50} />
                ) : (
                    <Virtual size={50} />
                )}
                <br />
                {tittle}
            </button>
        </div>
    );
}

export default Buttonselect;
