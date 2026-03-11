import React from "react";

function LoanResult({ result }) {

  if (!result) {
    return <h3>No result</h3>;
  }

  return (
    <div>

      <h2>Loan Decision</h2>

      <h3>Status: {result.status}</h3>

      <p>Reason: {result.reason}</p>

    </div>
  );
}

export default LoanResult;