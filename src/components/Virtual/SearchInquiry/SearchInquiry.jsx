import Lottie from 'react-lottie';
import { BackArrow } from '../../Atomic'
import successIcon from '../../../assets/lotties/success.json';
import failedIcon from '../../../assets/lotties/failed.json';
import '../BasePayment.css';
import {Button} from '../../Atomic';

function SearchInquiry({
    handleChange,   
    vaNumber,
    seaarchInquiryAct,
    clearInquiryAct,
    typeActButton,
    errSearch,
    paidStatus,
    cancelStatus,
    loading 
}) {
    const defaultOptions = { 
        loop: true,
        autoplay: true,
        animationData: paidStatus ? successIcon : cancelStatus ? failedIcon : failedIcon,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className="details">
            <BackArrow/>
            <div className="transactionsCss">
                <div
                    className="cardHeader"
                >
                    {
                        paidStatus || cancelStatus ?  "" : <h2> Search Virtual Account Payment </h2>
                    }
                </div>

                {
                    paidStatus || cancelStatus ?
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
                                <label className="label" >
                                    Insert Virtual Account Number
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: 777881109222019033"
                                    id="input-description-transaction"
                                    value={vaNumber}
                                    name="va_number"
                                    onChange={handleChange('va_number')}
                                    onKeyDown={handleChange()}
                                />
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
                                    tittle={"Search Inquiry"}
                                    seaarchInquiryAct={seaarchInquiryAct}
                                    typeActButton={"search_inquiry"}
                                    loading={loading}
                                />          
                                <Button
                                    tittle={"Clear Search"}
                                    type={"danger"}
                                    clearInquiryAct={clearInquiryAct}
                                    typeActButton={"clear_inquiry"}
                                />       
                            </div>
                        </div>
                    }
            </div>
        </div>
    )
}

export default (SearchInquiry);