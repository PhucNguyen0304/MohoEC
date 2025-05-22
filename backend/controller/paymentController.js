
import  crypto  from 'crypto' 
import axios from 'axios';

// MOMO PAYMENT

const momowallet = async(req,res)=> {
//https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
//parameters
let {totalAmount} = req.body
var accessKey = 'F8BBA842ECF85';
var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
var orderInfo = 'paywith MoMo';
var partnerCode = 'MOMO';
var redirectUrl = 'https://moho-ec.vercel.app/paymentinfor1'; 
var ipnUrl = 'https://moho-ec.vercel.app/paymentinfor1';
var requestType = "captureWallet";
var amount = totalAmount.toString();
var orderId = partnerCode + new Date().getTime();
var requestId = orderId;
var extraData ='';
var orderGroupId ='';
var autoCapture =true;
var lang = 'vi';

//before sign HMAC SHA256 with format
//accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
//puts raw signature
console.log("--------------------RAW SIGNATURE----------------")
console.log(rawSignature)
//signature
//const crypto = require('crypto');= 
var signature = crypto.createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');
console.log("--------------------SIGNATURE----------------")
console.log(signature)

//json object send to MoMo endpoint
const requestBody = JSON.stringify({
    partnerCode : partnerCode,
    partnerName : "Test",
    storeId : "MomoTestStore",
    requestId : requestId,
    amount : amount,
    orderId : orderId,
    orderInfo : orderInfo,
    redirectUrl : redirectUrl,
    ipnUrl : ipnUrl,
    lang : lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData : extraData,
    orderGroupId: orderGroupId,
    signature : signature
});
console.log(requestBody)
//optioni for axios 
    const options = {
        method: "POST",
        url: "https://test-payment.momo.vn/v2/gateway/api/create",
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        },
        data: requestBody
    }
    let result
    try {
         result = await axios(options);
        console.log(requestBody)
        return res.json({success:true,data:result.data,payUrl:result.data.payUrl})
    }catch(error) {
        console.log(error) 
        return res.json({success:false,message:error})
    }
}
const callback = async(req,res) => {
    const {partnerCode,orderId,amount,resultCode} = req.query
    const data = {
        partnerCode,orderId,amount,resultCode
    }
    console.log("callback " + data)
    return res.json({success:true,data:data})
    
}
export {momowallet,callback}