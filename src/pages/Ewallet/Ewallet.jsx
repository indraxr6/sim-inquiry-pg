import React, { useState } from 'react';
import { SearchInquiryWallet as SearchInquiry, InquiryWallet as Inquiry} from '../../components';
import { payAlert } from '../../components/Atomic/Alert/Alert';
import {onFindInquiry, onPayInquiry} from '../../redux/payment/action'
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import './Ewallet.css';

function Ewallet(props) {
    const [externalId, setExternalId] = useState('');
    const [orderId, setOrderId] = useState('');
    const [trxId, setTrxId] = useState('');
    const [channel, setChannel] = useState('');
    const [externalIdFix, setExternalIdFix] = useState('');
    const [orderIdFix, setOrderIdFix] = useState('');
    const [trxIdFix, setTrxIdFix] = useState('');
    const [channelFix, setChannelFix] = useState('');
    const [errSearch, setErrSearch] = useState(false);
    const [errTrxId, setErrTrxId] = useState(false); 
    const [errExtId, setErrExtId] = useState(false);
    const [errOrderId, setErrOrderId] = useState(false); 
    const [errChannel, setErrChannel] = useState('');
    const [errPay, setErrPay] = useState('');
    const [payAmountTxt, setPayAmountTxt] = useState(0);
    const [paidStatus, setPaidStatus] = useState(false);
    const [mustTotalPay, setMustTotalPay] = useState(0);
    const [loading,setLoading] = useState(false);
    const [btnDisable, setBtnDisable] = useState(false)
    const [paymentType] = useState('ewallet');
    const animationTimeout = Number(process.env.REACT_APP_ANIMATION_TIMEOUT)  

    const handleChange = (prop) => (e) => {
        var regex = /[ !@\\#$%^&*(|,+=`~.;':"/>?<)_{}	]+/g;
        if (prop === "transaction_id") {
            if (!e.target.value) {
                setErrTrxId("Transaction ID is required");
                setErrSearch('')
                setTrxId('');
            } else {
                setErrTrxId(null);
                setTrxId(e.target.value.replace(regex, ''));
            }
        }

        if (prop === "external_id") {
            if (!e.target.value) {
                setErrExtId("External ID is required");
                setErrSearch('')
                setExternalId('');
            } else {
                setErrExtId(null);
                setExternalId(e.target.value.replace(regex, ''));
            }
        } 

        if (prop === "order_id") {
            if (!e.target.value) {
                setErrOrderId("Order ID is required");
                setErrSearch('')
                setOrderId('');
            } else {
                setErrOrderId(null);
                setOrderId(e.target.value.replace(regex, ''));
            }
        }

        if (prop === "payment_channel") {
            if (!e.target.value) {
                setErrChannel("Channel is required");
                setErrSearch('')
                setChannel('');
            } else {
                setErrChannel(null);
                setChannel(e.target.value);
            } 
        }
      
        if (prop === "amount_val") {
            setPayAmountTxt(e.target.value)
            setErrPay(null)
        }
    }
    
    const clearInquiryAct = () => {
        setOrderId('');
        setExternalId('');
        setChannel('');
        setTrxId('');
        setErrTrxId('');
        setErrExtId('');
        setErrOrderId('');
        setErrChannel('');
        setMustTotalPay('');
        setErrSearch('');
    }

    const srcDisable = (() => {
        if(!trxId) return true
        if(!externalId) return true
        if(!orderId) return true
        if(!channel) return true
        else {
            return false
        }
    })()

    const seaarchInquiryAct = () => {
        setLoading(true)
        setBtnDisable(true)
        setErrSearch('')
        const reqSearchInquiry = {
            "external_id": externalId,
            "order_id": orderId,
            "transaction_id": trxId,
            "payment_channel": channel,
            "payment_method": "wallet"
        }
        
        if (trxId && externalId && orderId && channel) {
            props.findInquiryProp( reqSearchInquiry, paymentType, e => {
                if (e.transaction_status === 'ACTIVE') {
                    setExternalIdFix(e.external_id);
                    setOrderIdFix(e.order_id);
                    setTrxIdFix(e.transaction_id);
                    setChannelFix(e.payment_channel);
                    setMustTotalPay(e.payment_details.total_amount);
                    setBtnDisable(false)
                    setLoading(false)
                    return 
                }
    
                if (e.status) {
                    if ( e.status !== 200 ) {
                        setMustTotalPay(0)
                        setErrSearch(e.data.response_message)
                        Swal.fire({icon : "info", title : e.data.response_message})
                        setBtnDisable(false)
                        setLoading(false)
                        return
                    }
                } else {
                    // setErrSearch(`Transaction is ${e.transaction_status}`);
                    Swal.fire({icon : "info", title : "Transaction status is " + e.transaction_status.toLowerCase()})
                    setMustTotalPay(0);
                    setBtnDisable(false)
                    setLoading(false)
                    return 
                }
            })
        }
    }

    const payInquiryAct = () => { 
        const reqPayInquiry = {
            "external_id": externalIdFix,
            "order_id": orderIdFix,
            "transaction_id": trxIdFix,
            "payment_channel": channelFix,
            "payment_method" : "wallet"
        }
        Swal.fire(payAlert).then((result) => {
            if (result.isConfirmed) {
                props.payInquiryProp(reqPayInquiry, paymentType, e => {
                    if (e.status !== undefined && e.status !== 200) {
                        if (e.data.response_code) {
                            setErrPay(e.data.response_message);
                            setPaidStatus(false);
                            if (e.data.response_message) {
                                Swal.fire({icon : "info", title : e.data.response_message})
                            }
                        } 
                    }
                  
                    if (e.transaction_status === "PAID" || e.transaction_status === "ACTIVE") {
                        setExternalId('');
                        setOrderId('');
                        setTrxId('');
                        setChannel('');
                        setErrSearch('');
                        setMustTotalPay(0);
                        setPaidStatus(true);
                    }
                    setTimeout(() => {
                        setPaidStatus(false)
                    }, animationTimeout);
                })
            }
        })
    }

    return (
        <> 
            <SearchInquiry
                handleChange={handleChange} 
                orderId={orderId}
                externalId={externalId}
                channel={channel}
                trxId={trxId} 
                clearInquiryAct={clearInquiryAct}
                seaarchInquiryAct={seaarchInquiryAct}
                errTrxId={errTrxId}
                errExtId={errExtId}
                errOrderId={errOrderId}
                errChannel={errChannel}
                errSearch={errSearch}
                paidStatus={paidStatus}
                loading={loading}
                btnDisable={btnDisable}
                srcDisable={srcDisable}
            />
            {
                mustTotalPay ?
                    <Inquiry
                        handleChange={handleChange}
                        payInquiryAct={payInquiryAct}
                        externalIdFix={externalIdFix}
                        trxIdFix={trxIdFix} 
                        orderIdFix={orderIdFix}
                        channelFix={channelFix}
                        mustTotalPay={mustTotalPay}
                        errPay={errPay}
                        payAmountTxt={payAmountTxt}
                    />
                :
                ""          
            }
        </> 
    )
}

const mapStateToProps = state => {
    return {
        dataPayment: state.payment.inquiry_data,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        findInquiryProp: async (req, paymentType, callback) => {
            const res = await dispatch(onFindInquiry(req, paymentType))
            callback(res);
        },
        payInquiryProp: async (req, paymentType, callback) => {
            const res = await dispatch(onPayInquiry(req, paymentType))
            callback(res);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ewallet)