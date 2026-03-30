package com.loanapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "loan_application")
public class LoanApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ================= USER =================
    @Column(name = "user_id", nullable = false)
    private Long userId;

    // ================= LOAN TYPE =================
    @Column(name = "loan_type", nullable = false)
    private String loanType;

    // ================= PAN =================
    @Column(name = "pan_number", nullable = false)
    @Pattern(regexp = "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
             message = "Invalid PAN format")
    private String panNumber;

    // ================= LOAN AMOUNT =================
    @Column(name = "loan_amount", nullable = false)
    @Min(value = 1000, message = "Loan amount must be at least 1000")
    private double loanAmount;

    // ================= INCOME =================
    @Column(nullable = false)
    @Min(value = 1000, message = "Income must be valid")
    private double income;

    // ================= CREDIT SCORE =================
    @Column(name = "credit_score", nullable = false)
    @Min(300)
    @Max(900)
    private int creditScore;

    // ================= EXISTING LOAN =================
    @Column(name = "existing_loan")
    private double existingLoan = 0;

    // ================= EMPLOYMENT =================
    @Column(name = "years_of_employment")
    private int yearsOfEmployment = 0;

    // ================= RESULT =================
    private String status;
    private String reason;

    // ================= XAI FIELDS =================
    private Double riskScore;

    @Column(length = 1000)
    private String explanation;

    // ================= NEW FIELD: EMI =================
    @Column(name = "emi")
    private Double emi;

    // ================= CONSTRUCTOR =================
    public LoanApplication() {}

    // ================= GETTERS & SETTERS =================

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getLoanType() {
        return loanType;
    }

    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }

    public String getPanNumber() {
        return panNumber;
    }

    public void setPanNumber(String panNumber) {
        this.panNumber = panNumber.toUpperCase(); // ✅ always uppercase
    }

    public double getLoanAmount() {
        return loanAmount;
    }

    public void setLoanAmount(double loanAmount) {
        this.loanAmount = loanAmount;
    }

    public double getIncome() {
        return income;
    }

    public void setIncome(double income) {
        this.income = income;
    }

    public int getCreditScore() {
        return creditScore;
    }

    public void setCreditScore(int creditScore) {
        this.creditScore = creditScore;
    }

    public double getExistingLoan() {
        return existingLoan;
    }

    public void setExistingLoan(double existingLoan) {
        this.existingLoan = existingLoan;
    }

    public int getYearsOfEmployment() {
        return yearsOfEmployment;
    }

    public void setYearsOfEmployment(int yearsOfEmployment) {
        this.yearsOfEmployment = yearsOfEmployment;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    // ================= XAI GETTERS =================

    public Double getRiskScore() {
        return riskScore;
    }

    public void setRiskScore(Double riskScore) {
        this.riskScore = riskScore;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    // ================= EMI GETTERS =================

    public Double getEmi() {
        return emi;
    }

    public void setEmi(Double emi) {
        this.emi = emi;
    }

    // ================= DEBUG =================
    @Override
    public String toString() {
        return "LoanApplication{" +
                "id=" + id +
                ", userId=" + userId +
                ", loanType='" + loanType + '\'' +
                ", panNumber='" + panNumber + '\'' +
                ", loanAmount=" + loanAmount +
                ", income=" + income +
                ", creditScore=" + creditScore +
                ", existingLoan=" + existingLoan +
                ", yearsOfEmployment=" + yearsOfEmployment +
                ", status='" + status + '\'' +
                ", reason='" + reason + '\'' +
                ", riskScore=" + riskScore +
                ", emi=" + emi +
                ", explanation='" + explanation + '\'' +
                '}';
    }
}