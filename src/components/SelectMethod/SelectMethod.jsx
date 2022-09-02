import React from "react";
import { BackArrow } from "../Atomic";
import { Buttonselect as Button } from "../Atomic";
import "./SelectMethod.css";

const SelectMethod = () => {
    return (
        <>
            <div className="details">
                <BackArrow className="btnBack" />
                <div className="transactionsCss">
                    <div className="cardHeader">
                        <h2>Payment Method </h2>
                    </div>
                    <div className="bodyPayPage">
                        <div className="inputDesc">
                            <label className="label">
                                Select payment method to search inquiry details.
                            </label>
                        </div>

                        <div className="btnAddTransactionArea mc2l00">
                            <div className="btnSelectMethod">
                                <Button tittle={"E-Wallet"} />
                            </div>
                            <div className="btnSelectMethod">
                                <Button tittle={"Virtual Account"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SelectMethod;
