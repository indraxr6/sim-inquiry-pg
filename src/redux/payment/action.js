import { baseUrl } from "../../config";
import libHeplers from "../../helpers";

var auth = libHeplers.generateAuth();
var va = process.env.REACT_APP_VA
var ewallet = process.env.REACT_APP_EWALLET


export const paymentData = (item) => {
    return {
        type: "PAYMENT",
        payload: {
            item,
        },
    };
};

export const onPayment = (item) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(paymentData(item));
            resolve();
        });
    };
};

export const findInquiryData = (item) => {
    return {
        type: "FIND_INQUIRY",
        payload: {
            item,
        },
    };
};

export const payInquiryData = (item) => {
    return {
        type: "PAY_INQUIRY",
        payload: {
            item,
        },
    };
};

export const cancelInquiryData = (item) => {
    return {
        type: "CANCEL_INQUIRY",
        payload: {
            item,
        },
    };
};

export const onFindInquiry = (req, paymentType) => async dispatch => {
    const order = {
        order_id: req.order_id,
        external_id: req.external_id,
        hashkey: process.env.REACT_APP_HASH_KEY,
    };
    let url;
    var signat = libHeplers.generateSignature(order);
    paymentType === "ewallet" 
        ? (url = ewallet + "inquiry") 
        : (url = va + "inquiry-simple");
    try {
        const headers = {
            Authorization: auth, 
            "x-version": "v3",
            "Content-Type": "application/json",
            "x-req-signature": signat,
        };
        const res = await baseUrl.post(url, req, { headers });
        if (res.status === 200) {
            dispatch(findInquiryData(res.data));
        }
        return res.data;
    }
    catch (err) {
        return err.response;
    }
};

export const onPayInquiry = (req, paymentType) => async dispatch => {
    const order = {
        order_id: req.order_id,
        external_id: req.external_id,
        hashkey: process.env.REACT_APP_HASH_KEY,
    };
    var signat = libHeplers.generateSignature(order);
    let url, res;
    paymentType === 'ewallet' 
        ? (url = ewallet + "dummy-payment")
        : (url = va + "dummy-payment");
    try {
        const headers = {
            Authorization: auth, 
            "x-version": "v3",
            "Content-Type": "application/json",
            "x-req-signature": signat,
        };
        paymentType === 'ewallet' 
            ? res = await baseUrl.post(url, req, { headers }) 
            : res = await baseUrl.put(url, req, { headers });
        if (res.status === 200) {
            dispatch(payInquiryData(res.data));
        }
        return res.data;
    }
    catch (err) {
        return err.response;
    }
};

export const onCancelInquiry = (req) => async dispatch => {
    const order = {
        order_id: req.order_id,
        external_id: req.external_id,
    };
    var signat = libHeplers.generateSignatureEwallet(order);
    try {
        const headers = {
            Authorization: auth, 
            "x-version": "v3",
            "Content-Type": "application/json",
            "x-req-signature": signat,
        };
        const res = await baseUrl.post("/va/cancel", req, { headers });
        if (res.status === 200) {
            dispatch(cancelInquiryData(res.data));
        }
        return res.data;
    }
    catch (err) {
        return err.response;
    }
};

