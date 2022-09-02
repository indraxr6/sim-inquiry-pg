import React, { useState } from 'react';
import { SearchInquiry, Inquiry} from '../../components';
import { cancelAlert, payAlert } from '../../components/Atomic/Alert/Alert';
import { onFindInquiry, onPayInquiry, onCancelInquiry } from '../../redux/payment/action'
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import './Virtual.css';

function Payment(props) {
    const [vaNumber, setVANumber] = useState('');
    const [vaNumberFix, setVANumberFix] = useState('');
    const [externalId, setExternalId] = useState('');
    const [orderId, setOrderId] = useState('');
    const [trxId, setTrxId] = useState('');
    const [channel, setChannel] = useState('');
    const [errSearch, setErrSearch] = useState('');
    const [errPay, setErrPay] = useState('');
    const [payAmount, setPayAmount] = useState(0);
    const [payAmountTxt, setPayAmountTxt] = useState(0);
    const [paidStatus, setPaidStatus] = useState(false);
    const [cancelStatus, setCancelStatus] = useState(false);
    const [mustTotalPay, setMustTotalPay] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [loading, setLoading] = useState(false);
    const [btnDisable, setBtnDisable] = useState(false)
    const [paymentType] = useState('va')
    const animationTimeout = Number(process.env.REACT_APP_ANIMATION_TIMEOUT)
    const minPayAmount = Number(process.env.REACT_APP_MIN_PAY_AMOUNT)

    const handleChange = (prop) => (e) => {
        var regex = /[^0-9]/g; 
        if (prop === "va_number") {
            if (!e.target.value) {
                setErrSearch("VA Number is required");
                setVANumber('');
            } else {
                setErrSearch(null);
                setVANumber(e.target.value.replace(regex, ''));
            }
        }    

        if (prop === "amount_val") {
            setPayAmount(e.target.value)
            setPayAmountTxt(e.target.value)
            setErrPay(null)
        }

        if (e.key === " ") {
            e.preventDefault();
            setErrSearch('Whitespace is not allowed');
        }

        if (e.key === 'Enter') {
            seaarchInquiryAct();
        }
    }

    const clearInquiryAct = () => {
        setErrSearch('')
        setVANumber('');
        setVANumberFix('')
        setOrderId('')
        setChannel('')
        setMustTotalPay(0)
        setExternalId('');
        setPayAmount(0);
        setPayAmountTxt('');
    }

    // ::SEARCH ACTION:: //
    
    const seaarchInquiryAct = () => {
        setLoading(true)
        const reqSearchInquiry = {
            "va_number": vaNumber,
        }
    
        if (vaNumber === '') {
            setErrSearch('VA Number is required');
            setExternalId('');
            setMustTotalPay(0);
            setPaymentMethod(null);
            setLoading(false)
            return
        } 
        
        props.findInquiryProp( reqSearchInquiry, paymentType, e => {
            setErrPay('')
            setBtnDisable(true)
            if (e.status) {
                if ( e.status !== 200 && e.data.response_code) {
                    Swal.fire({icon : "info", title : e.data.response_message})
                    setExternalId('');
                    setOrderId('');
                    setTrxId('');
                    setChannel('');
                    setVANumberFix('');
                    setLoading(false)
                    setBtnDisable(false) 
                    return
                } 
            }
            if (e.transaction_status === 'ACTIVE') {
                setExternalId(e.external_id);
                setOrderId(e.order_id);
                setTrxId(e.transaction_id);
                setChannel(e.payment_channel);
                setVANumberFix(e.payment_details.va_number);
                setMustTotalPay(e.payment_details.total_amount);
                setPaymentMethod(e.payment_method);
                setErrSearch('');
                setPayAmountTxt('');
                setLoading(false)
                setBtnDisable(false)
            } else {
                Swal.fire({icon : "info", title : "Transaction status is " + e.transaction_status.toLowerCase()})
                setExternalId('');
                setOrderId('');
                setTrxId('');
                setChannel('');
                setVANumberFix('');
                setMustTotalPay(0);
                setPaymentMethod(null);
                setLoading(false)
                setBtnDisable(false)
                return
            }
        })
    }

    // ::PAY ACTION:: //

    const payInquiryAct = () => {
        const reqPayInquiry = {
            "external_id": externalId,
            "order_id": orderId,
            "transaction_id": trxId,
            "amount": Number(payAmount)
        }

        if (payAmount < minPayAmount || payAmount === 0) {
            setErrPay("Payment should not be less than " + minPayAmount);
            
        } else if (payAmount >= minPayAmount) { 
            Swal.fire(payAlert).then((result) => {
                if (result.isConfirmed) {          
                    props.payInquiryProp(reqPayInquiry, paymentType, e => {  
                        if (e.status !== undefined && e.status !== 200) {
                            if (e.data.response_code) {
                                setPaidStatus(false);
                                if (e.data.response_message) {
                                    Swal.fire({
                                        icon : "info", 
                                        title : e.data.response_message, 
                                        confirmButtonColor : 'var(--blue)'
                                    })
                                }
                            } 
                        }
                      
                        if (e.transaction_status === "PAID" || e.transaction_status === "ACTIVE") {
                            setOrderId('');
                            setTrxId('');
                            setChannel('');
                            setExternalId('')
                            setErrSearch('');
                            setPaidStatus(true);
                            setVANumber('');
                        }
                        setTimeout(() => {
                            setPaidStatus(false)
                        }, animationTimeout);
                    })
                }
            });
        }       
    }

    // ::CANCEL ACTION:: //

    const cancelInquiryAct = () => {
        setErrPay('')
        const reqCancelInquiry = {
            "external_id": externalId,
            "order_id": orderId,
            "transaction_id": trxId,
            "payment_method": paymentMethod,
            "payment_channel": channel
        }

    Swal.fire(cancelAlert).then((result) => {
        if (result.isConfirmed) {
            props.cancelInquiryProp( reqCancelInquiry, e => {
                if (undefined !== e.status && e.status !== 200) {
                    if (e.data.response_code) {
                        setCancelStatus(false);
                        setErrPay(e.data.response_message);
                    }
                }

                if (e.transaction_status === "CANCELED") {
                    setExternalId('');
                    setOrderId('');
                    setTrxId('');
                    setChannel('');
                    setVANumberFix('');
                    setVANumber('')
                    setErrSearch('');
                    setCancelStatus(true);
                    setPaymentMethod(null);
                }
                setTimeout(() => {
                    setCancelStatus(false)
                }, animationTimeout);
            })
        }
    });        
}
    return (
        <>
            {/* <Header /> */}
            <SearchInquiry 
                handleChange={handleChange}
                vaNumber={vaNumber} 
                seaarchInquiryAct={seaarchInquiryAct}
                clearInquiryAct={clearInquiryAct}
                errSearch={errSearch}
                paidStatus={paidStatus}
                cancelStatus={cancelStatus}
                loading={loading}
                btnDisable={btnDisable}  
            />
            {
                externalId ?
                    <Inquiry
                        handleChange={handleChange}
                        payInquiryAct={payInquiryAct}
                        vaNumberFix={vaNumberFix}
                        orderId={orderId}
                        channel={channel}
                        mustTotalPay={mustTotalPay}
                        errPay={errPay} 
                        cancelInquiryAct={cancelInquiryAct}
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
        },
        cancelInquiryProp: async (req, callback) => {
            const res = await dispatch(onCancelInquiry(req))
            callback(res);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment)