package com.loanapp.model;

import java.util.List;

public class LoanOffer {

    private double interestRate;
    private double maxLoanAmount;
    private double riskScore;
    private List<String> availableLoans;

    public LoanOffer(double interestRate, double maxLoanAmount, double riskScore, List<String> availableLoans) {
        this.interestRate = interestRate;
        this.maxLoanAmount = maxLoanAmount;
        this.riskScore = riskScore;
        this.availableLoans = availableLoans;
    }

    public double getInterestRate() {
        return interestRate;
    }

    public double getMaxLoanAmount() {
        return maxLoanAmount;
    }

    public double getRiskScore() {
        return riskScore;
    }

    public List<String> getAvailableLoans() {
        return availableLoans;
    }
}