/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {GetEVoucher, ActiveEVoucher} from "../Api";
import moment from 'moment';
import { useHistory } from "react-router-dom";

export default function Home() {
    
    const history = useHistory();
    const [data, setData] = useState([])

    async function HandleActiveClick(e, index) {
        e.preventDefault();

        let evoucher = data[index];
        try {
            await ActiveEVoucher(evoucher.id, !evoucher.is_active);
            
            setData(oldData => {
                let newData = oldData.map(voucher => {
                    if (voucher.id === evoucher.id){
                        let newVoucher = Object.assign({}, voucher);
                        newVoucher.is_active = !voucher.is_active
                        return newVoucher;
                    }
                    return voucher;
                });
                return newData;
            })
        } catch (error) {
            console.log(error);
        }
    }

    function HandleEditClick(e, index){
        e.preventDefault();
        history.push(`/edit/${data[index].id}`);
    }

    useEffect(async () => {
        // const requestOptions = {
        //     method: 'GET',
        //     headers: { 
        //         'Content-Type': 'application/json',
        //         'auth': localStorage.getItem('auth')
        //     }
        // };
        // try {
        //     let response = await fetch(Constant.apiBaseUrl + "/evouchers", requestOptions);
        //     response = await response.json();
        //     setData(response)
        //     // localStorage.setItem('auth', response.token);
        // } catch (error) {
        //     console.log(error);
        // }
        try {
            let response = await GetEVoucher();
            response = await response.json();
            setData(response);
        } catch (error) {

            console.log(error);
        }


      },[]);

    return (
        <div className="c-app flex-row">
            <div className="c-main container">
                <div className="row mb-2 justify-content-end">
                    <Link to="/new">
                        <button className="btn btn-primary">
                            Add New eVoucher
                        </button>
                    </Link>
                </div>
                <div className="row">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Discount Method</th>
                            <th scope="col">Discount Percent</th>
                            <th scope="col">Is Gift</th>
                            <th scope="col">Total Quantity</th>
                            <th scope="col">Available Quantity</th>
                            <th scope="col">User Limit</th>
                            <th scope="col">Gift Limit</th>
                            <th scope="col">Expiry Date</th>
                            <th scope="col">Is Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((evoucher, index) => {
                                    return (
                                        <tr key={evoucher.id}>
                                            <th scope="row" key={evoucher.id}>{evoucher.id}</th>
                                            <td className="text-center font-weight-bold">{evoucher.title}</td>
                                            <td className="text-center">{evoucher.description}</td>
                                            <td className="text-right">${evoucher.amount}</td>
                                            <td className={`text-center font-weight-bold ${evoucher.discount_method === 0 ? 'text-primary' : 'text-danger'}`}>{evoucher.discount_method === 0 ? 'VISA' : 'MASTER'}</td>
                                            <td className="text-center">{evoucher.discount_percent}%</td>
                                            <td className={`font-weight-bold ${evoucher.is_gift ? 'text-success' : 'text-danger'}`}>{evoucher.is_gift ? 'True' : 'False'}</td>
                                            <td className="text-right">{evoucher.total_quantity}</td>
                                            <td className="text-right">{evoucher.current_quantity}</td>
                                            <td>{evoucher.user_limit}</td>
                                            <td>{evoucher.gift_limit}</td>
                                            <td>{moment(evoucher.expiry_date).format('MMMM Do YYYY')}</td>
                                            <td>
                                                <label className="c-switch c-switch-pill c-switch-success">
                                                    <input type="checkbox" className="c-switch-input" checked={evoucher.is_active} onChange={e => HandleActiveClick(e, index)}/>
                                                    <span className="c-switch-slider"></span>
                                                </label>
                                            </td>
                                            <td>
                                                <a href="#" onClick={e => HandleEditClick(e, index)}>Edit</a>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
