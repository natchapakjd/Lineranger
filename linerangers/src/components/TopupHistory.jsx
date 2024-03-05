import axios from 'axios';
import React, { useState, useEffect } from 'react';

const TopupHistory = ({ username }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTransaction();
  }, []);

  const fetchTransaction = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_APP_URL + `transaction/${username}`);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='container p-5'>
      <p className='text-3xl'>ประวัติการเติมเงิน</p>
      <p className='text-amber-500 text-xl'>Topup history</p>
      <table className='border-collapse   w-full border border-slate-400 mx-auto my-2 2' >
        <thead >
          <tr>
            <th className='border border-slate-300'>id</th>
            <th className='border border-slate-300'>จำนวนเงิน</th>
            <th className='border border-slate-300'>วันที่เติม</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td className='border border-slate-300'>{i + 1}</td>
              <td className='border border-slate-300'>{item.amount}</td>
              <td className='border border-slate-300'>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopupHistory;
