import React from 'react';
import './Button.css';
import { CircularProgress } from '@mui/material';

function Button({ tittle, type, seaarchInquiryAct, payInquiryAct, cancelInquiryAct, clearInquiryAct, typeActButton, loading, btnDisable, srcDisable }) {    
    return (
        <>
            <button disabled={srcDisable || btnDisable} style={{cursor: srcDisable || btnDisable ? 'no-drop' : '', backgroundColor: srcDisable ? 'var(--black2)' : ''}}

                className={
                    type === "pay" ?
                        "btnAddTransaction"
                    :
                    type === "danger" ?
                        "btnDangerTransaction"
                    :
                        "btnAddTransaction"
                }                 
                id="btn-add-transaction"
                onClick={
                    typeActButton === 'search_inquiry' ?
                        seaarchInquiryAct
                    :
                    typeActButton === 'pay_inquiry' ?
                        payInquiryAct
                    :
                    typeActButton === 'cancel_inquiry' ?
                        cancelInquiryAct
                    :
                    typeActButton === 'clear_inquiry' ?
                        clearInquiryAct
                    :
                    "" 
                }
            >
            {tittle} {loading && typeActButton === 'search_inquiry' ? <CircularProgress thickness={5} size={15} color={'inherit'}/> : " "}
            </button>
        </>
    )
}

export default Button