import Lottie from 'react-lottie';
import { BackArrow, Button } from '../../Atomic'
import successIcon from '../../../assets/lotties/success.json';
import failedIcon from '../../../assets/lotties/failed.json';

function SearchInquiry({
    trxId,
    externalId,
    orderId,
    channel,
    handleChange,   
    seaarchInquiryAct,
    clearInquiryAct,
    errSearch,
    errTrxId,
    errExtId,
    errOrderId,
    errChannel,
    paidStatus,
    cancelStatus,
    loading,
    btnDisable,
    srcDisable
}) {
    
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: paidStatus ? successIcon : cancelStatus ? failedIcon : failedIcon,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const channel_options = [
        { label: '--Select Channel--', value: ''},
        { label: 'Nobu', value: 'NOBU' },
        { label: 'LinkAja', value: 'LINKAJA' },
        { label: 'ShopeePay', value: 'SHOPEEPAY' },
        { label: 'Dana', value: 'DANA' },
        { label: 'OVO', value: 'OVO' },
        { label: 'VIRGO', value: 'VIRGO' },
    ];

    return (  
        <div className="details">
            <BackArrow/>
            <div className="transactionsCss">
                <div
                    className="cardHeader">
                    {
                        paidStatus || cancelStatus ?
                        ""
                        :    
                        <h2>Search E-Wallet Payment</h2> 
                    }
                </div>

                {
                    paidStatus || cancelStatus? 
                        <div>
                            {
                                paidStatus || cancelStatus ?
                                    <div className="css-cen029">
                                        <h3>
                                            {
                                                paidStatus ?
                                                    "Pay Success"
                                                :
                                                    "Transaction Is Cancelled"
                                            }
                                        </h3>
                                    </div>
                                :
                                    ""
                            }
                            <Lottie
                                options={defaultOptions}
                                height={300}
                                width={300}
                            />
                        </div>
                    :
                        <div className="bodyPayPage">
                            <div className="inputDesc">
                                <label className="label" >Transaction ID</label>
                                <input
                                    type="text"
                                    placeholder="Ex: 6e665db5-2240-46c3-855b-28fdd96fa399"
                                    id="input-description-transaction" 
                                    value={trxId}
                                    name="transaction_id"
                                    onChange={handleChange('transaction_id')}
                                    onKeyDown={handleChange()}
                                />
                                {
                                    errTrxId ? <label id="error-description" className="errorTxt"> {errTrxId} </label> : ""
                                }
                                
                                <label className="label" >External ID</label>
                                <input
                                    type="text"
                                    placeholder="Ex: s1YXXuXNG17r4ArDUZ2Jyz"
                                    id="input-description-transaction"
                                    value={externalId}
                                    name="external_id"
                                    onChange={handleChange('external_id')}
                                    onKeyDown={handleChange()}       
                                />
                                {
                                    errExtId ? <label id="error-description" className="errorTxt"> {errExtId} </label> : ""
                                }
                                
                                <label className="label" >Order ID</label>
                                <input
                                    type="text"
                                    placeholder="Ex: 00882"
                                    id="input-description-transaction"
                                    value={orderId}
                                    name="order_id"
                                    onChange={handleChange('order_id')}
                                    onKeyDown={handleChange()}
                                />
                                {
                                    errOrderId ? <label id="error-description" className="errorTxt"> {errOrderId} </label> : ""
                                }

                                <label className="label" >Payment Channel</label>
                                <select value={channel} className="input-description-transaction" onChange={handleChange('payment_channel')} name="payment_channel"> 
                                    {channel_options.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>                              
                                    ))}
                                </select>

                                {
                                    errChannel ? <label id="error-description" className="errorTxt"> {errChannel} </label> : ""           
                                }                  
                                
                                {
                                    errSearch ?
                                        <label
                                            id="error-description"
                                            className="errorTxt"
                                        >
                                            {errSearch}
                                        </label>
                                    :
                                        ""
                                }
                            </div>
                            <div className="btnAddTransactionArea mc2l00">
                                <Button
                                    tittle={"Search Transaction"}
                                    seaarchInquiryAct={seaarchInquiryAct}
                                    typeActButton={"search_inquiry"}
                                    loading={loading}
                                    btnDisable={btnDisable}
                                    srcDisable={srcDisable}
                                />          
                                <Button
                                    tittle={"Clear Inquiry"}
                                    clearInquiryAct={clearInquiryAct}
                                    typeActButton={"clear_inquiry"}
                                    type={"danger"}
                                />       
                            </div>
                        </div>
                    }
            </div>
        </div>
    )
}

export default (SearchInquiry);
