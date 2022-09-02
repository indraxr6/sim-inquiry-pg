var crypto = require("crypto-js");
var keyUnboundEnv = process.env.REACT_APP_UNBOUND_KEY;
var keyHashEnv = process.env.REACT_APP_HASH_KEY;
var keyMidEnv = process.env.REACT_APP_MIDDLEWARE

function generateAuth() {
    var mid = keyMidEnv;
    var unbound = keyUnboundEnv;
    var _auth = mid + ":" + unbound;
    var __auth = btoa(_auth);
    var authBasic = "Basic " + __auth;  
    return authBasic;
    // return "Basic TUNQMDAwMDAwMDE6MHgwMDA4YzM3MDkyZjViNWRmODg="
}

function generateSignature(order) {
    var hashKey = keyHashEnv;
    var orderId = order.order_id;
    var externalId = order.external_id;
    const mat = hashKey + externalId + orderId;
    var signature = crypto.SHA256(mat).toString(); 
    return signature;
}

const formatterCurrency = new Intl.NumberFormat('id-ID', {
	style: 'currency',
	currency: 'IDR',
	minimumFractionDigits: 0
});

function generateSignatureEwallet(order){
    var orderid = order.order_id;   
    var extid = order.external_id;
    var hashkey = keyHashEnv;
    var data = hashkey + extid + orderid;
    var hash = crypto.SHA256(data);
    var signature = hash.toString(crypto.enc.hex);
    return signature
}

const libHeplers = {
    generateAuth,
    generateSignature,
    generateSignatureEwallet,
    formatterCurrency,   
}

export default libHeplers;