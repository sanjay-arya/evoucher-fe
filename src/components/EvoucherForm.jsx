import {useState} from 'react';
import {CAlert} from "@coreui/react";
import { useHistory } from "react-router-dom";
import {CreateEvoucher, UpdateEvoucher} from "../Api"
import moment from 'moment';
export default function EvoucherForm(props) {
    const history = useHistory();

    const [title, setTitle] = useState(props.title ? props.title : '')
    const [desc, setDesc] = useState(props.desc ? props.desc : '')
    const [amount, setAmount] = useState(props.amount ? props.amount : '')
    const [disPer, setDisPer] = useState(props.disPer ? props.disPer : '')
    const [disMethod, setDisMethod] = useState(props.disMethod ? props.disMethod : 0)
    const [isGift, setIsGift] = useState(props.isGift ? props.isGift : 0)
    const [quantity, setQuantity] = useState(props.quantity ? props.quantity : '')
    const [userLimit, setUserLimit] = useState(props.userLimit ? props.userLimit : '')
    const [giftLimit, setGiftLimit] = useState(props.giftLimit ? props.giftLimit : '')
    const [expiryDate, setExpiryDate] = useState(props.expiryDate ? moment(props.expiryDate).format("YYYY/MM/DD") : '');

    const [voucher, setVoucher] = useState(props.voucher ? props.voucher : null);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function onSaveClick(e){
        e.preventDefault();
        let issue = null;
        setError(null);
        if(title.length <= 0){
            issue = "Title is required";
        }else if(amount <= 0){
            issue = "Amount must be atleast 1";
        }else if(disPer <= 0){
            issue = "Discount Percentage must be at least 1";
        }else if(quantity <= 0){
            issue = "Quantity must be at least 1";
        }else if(userLimit <=0 ){
            issue = "User Limit must be at least 1";
        }else if(isGift === '1' && giftLimit <= 0){
            issue = "Gift Limit must be at least 1";
        }else if(expiryDate.length <= 0){
            issue = "Please choose expiry date";
        }

        console.log(isGift);
        setError("");
        setError(issue);

        if(issue != null){
            return;
        }
        
        if(voucher != null){
            try {
                setLoading(true);
                let response = await UpdateEvoucher(voucher,{
                    "title": title,
                    "description": desc,
                    "expiry_date": expiryDate,
                    "amount": amount,
                    "total_quantity": quantity,
                    "discount_method": disMethod,
                    "discount_percent": disPer,
                    "user_limit": userLimit,
                    "is_gift": isGift === '1' ? true : false,
                    "gift_limit": giftLimit
                });
                setLoading(true);
                history.push("/");
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }else{
            try {
                setLoading(true);
                let response = await CreateEvoucher({
                    "title": title,
                    "description": desc,
                    "expiry_date": expiryDate,
                    "amount": amount,
                    "total_quantity": quantity,
                    "discount_method": disMethod,
                    "discount_percent": disPer,
                    "user_limit": userLimit,
                    "is_gift": isGift === '1' ? true : false,
                    "gift_limit": giftLimit
                });
                setLoading(true);
                history.push("/");
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }

    }

    return (
        <div className="c-app flex-row align-items-center">
            <div className="c-main container col-md-6 col-3" >
            {error &&
            <CAlert color="danger">
                {error}
            </CAlert>
            }
                <div className="card p-4">
                    <form>
                        <div className="form-group">
                            <label htmlFor="inputTitle">Title</label>
                            <input type="text" className="form-control" id="inputTitle" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputDescription">Description</label>
                            <textarea className="form-control" id="inputDescription" placeholder="Description" rows="3" value={desc} onChange={e => setDesc(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAmount">Amount</label>
                            <input type="number" className="form-control" id="inputAmount" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputDiscountPercentage">Discount Percentage</label>
                            <input type="number" className="form-control" id="inputDiscountPercentage" placeholder="Discount Percentage" value={disPer} onChange={e => setDisPer(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputIsGift">Discount Method</label>
                            <select className="form-control" id="inputIsGift" value={disMethod} onChange={e => setDisMethod(e.target.value)} required>
                            <option value="0">VISA</option>
                            <option value="1">MASTER</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputIsGift">Is Gift</label>
                            <select className="form-control" id="inputIsGift" value={isGift} onChange={e => setIsGift(e.target.value)} required>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputQuantity">Quantity</label>
                            <input type="number" className="form-control" id="inputQuantity" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputUserLimit">User Limit</label>
                            <input type="number" className="form-control" id="inputUserLimit" placeholder="UserLimit" value={userLimit} onChange={e => setUserLimit(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputGiftLimit">Gift Limit</label>
                            <input type="number" className="form-control" id="inputGiftLimit" placeholder="GiftLimit" value={giftLimit} onChange={e => setGiftLimit(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputExpiryDate">Expiry Date</label>
                            <input type="date" className="form-control" id="inputExpiryDate" placeholder="ExpiryDate" value={expiryDate} onChange={e => setExpiryDate(e.target.value)}/>
                        </div>

                        <div className="form-group row">
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary btn-block" onClick={onSaveClick}>
                                {loading && <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>}
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {error &&
                    <CAlert color="danger">
                        {error}
                    </CAlert>
                }
            </div>
        </div>
    )
}