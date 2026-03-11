import React, { useState } from "react";
import API from "../services/api";

function ApplyLoan(){

const [loan,setLoan] = useState({
loanType:"",
loanAmount:"",
income:"",
creditScore:""
});

const handleChange = (e)=>{
setLoan({...loan,[e.target.name]:e.target.value});
};

const applyLoan = async () => {

  try {

    const storedUser = JSON.parse(localStorage.getItem("user"));

    const userId = storedUser.user.id;

    const response = await API.post("/api/loan/apply", {
      userId: userId,
      loanType: loan.loanType,
      loanAmount: Number(loan.loanAmount),
      income: Number(loan.income),
      creditScore: Number(loan.creditScore)
    });

    alert("Loan Applied Successfully");

  } catch (error) {

    console.error(error);

    alert("Loan Application Failed");

  }

};
return(

<div style={{padding:"40px"}}>

<h1>Apply Loan</h1>

<select name="loanType" onChange={handleChange}>

<option value="">Select Loan Type</option>
<option value="Personal Loan">Personal Loan</option>
<option value="Home Loan">Home Loan</option>
<option value="Car Loan">Car Loan</option>

</select>

<br/><br/>

<input
name="loanAmount"
placeholder="Loan Amount"
onChange={handleChange}
/>

<br/><br/>

<input
name="income"
placeholder="Monthly Income"
onChange={handleChange}
/>

<br/><br/>

<input
name="creditScore"
placeholder="Credit Score"
onChange={handleChange}
/>

<br/><br/>

<button onClick={applyLoan}>
Apply Loan
</button>

</div>

);

}

export default ApplyLoan;
