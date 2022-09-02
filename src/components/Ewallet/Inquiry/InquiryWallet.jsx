import React from 'react';
import libHeplers from '../../../helpers';
import { Button } from '../../Atomic';

function Inquiry({
    payInquiryAct,
    trxIdFix,
    externalIdFix,
    orderIdFix,
    channelFix,
    mustTotalPay,
    errPay,
}) {

    return (

        <div className="details">
            <div className="transactionsCss">
                <div className="cardHeader">
                    <h2>Inquiry Payment</h2>
                    <hr />
                </div>

                <div className="row">
                    <div className="col-25">
                        <label htmlFor="lname">Transaction ID</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="text"
                            id="lname"
                            name="lastname"
                            placeholder="6e665db5-2240-46c3-855b-28fdd96fa399"
                            value={trxIdFix}
                            disabled
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label htmlFor="lname">External ID</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="text"
                            id="lname"
                            name="lastname"
                            placeholder="s1YXXuXNG17r4ArDUZ2Jyz"
                            value={externalIdFix}
                            disabled
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label htmlFor="lname">Order ID</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="text"
                            id="lname"
                            name="lastname"
                            placeholder="00882"
                            value={orderIdFix}
                            disabled
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="lname">Amount To Pay</label>
                    </div>
                    <div className="col-75">
                        <div className="mc2l00">
                            
                            <div className="col-37">
                                <input
                                    type="text"
                                    id="lname"
                                    name="lastname"
                                    placeholder="Rp. 10.000"
                                    value={libHeplers.formatterCurrency.format(mustTotalPay)}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="lname">Channel</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="text"
                            id="lname"
                            name="lastname"
                            placeholder="OVO"
                            value={channelFix}
                            disabled
                        />
                    </div>
                </div>

                <div className="row">
                        <label
                            id="error-description"
                            className="errorTxt"
                        >
                            {errPay}
                        </label>
                </div>

                <div className="bodyPayPage">
                    <div className="btnAddTransactionArea mc2l00">
                        <Button
                            tittle={"Pay E-Wallet"}
                            type={"pay"}
                            typeActButton={"pay_inquiry"}
                            payInquiryAct={payInquiryAct}  
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
    
export default Inquiry