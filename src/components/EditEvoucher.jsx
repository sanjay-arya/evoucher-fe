/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react'
import EvoucherForm from "./EvoucherForm"
import {GetSingleEVoucher} from "../Api"
import { useHistory } from "react-router-dom";
export default function EditEvoucher(props) {
    const history = useHistory();

    const [data, setData] = useState(null)

    useEffect(async () => {
        let id = props.computedMatch.params.id
        console.log(id);
        
        try {
            let response = await GetSingleEVoucher(id);
            response = await response.json();
            setData(response);
            console.log(response);
        } catch (error) {
            console.log(error);
            history.push("/");
        }

      },[]);

    return (
        <div>
            {data && <EvoucherForm title={data.title} desc={data.description} amount={data.amount} disPer={data.discount_percent} disMethod={data.discount_method} isGift={data.is_gift} quantity={data.total_quantity} userLimit={data.user_limit} giftLimit={data.gift_limit} expiryDate={data.expiry_date} voucher={data.id}/>}
        </div>
    )
}
