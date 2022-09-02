import React from 'react';
import '../BasePayment.css';
import libHeplers from '../../../helpers';
import { Button } from '../../Atomic';

function Inquiry({
    handleChange,
    payInquiryAct,
    vaNumberFix,
    orderId,
    mustTotalPay,
    channel,
    errPay,
    cancelInquiryAct,
    payAmountTxt,
    vaNumber
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
                        <label htmlFor="lname">Virtual Account Number</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="text"
                            id="lname"
                            name="lastname"
                            placeholder="777881109222019033"
                            value={vaNumberFix}
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
                            placeholder="TEST-01"
                            value={orderId}
                            disabled
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="lname">Amount To Pay </label>
                    </div>
                    <div className="col-75">
                        <div className="mc2l00">
                            <div className="col-37">
                                <input
                                    value={payAmountTxt}
                                    type="number"
                                    id="amount-val"
                                    name="amount_val"
                                    placeholder="Rp. 10.000"
                                    onChange={handleChange('amount_val')}
                                />
                            </div>
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
                            placeholder="VA Permata"
                            value={channel}
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
                            tittle={"Pay VA"}
                            type={"pay"}
                            typeActButton={"pay_inquiry"}
                            payInquiryAct={payInquiryAct}
                            
                        />

                        <Button
                            tittle={"Cancel VA"}
                            type={"danger"}
                            typeActButton={"cancel_inquiry"}
                            cancelInquiryAct={cancelInquiryAct}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Inquiry