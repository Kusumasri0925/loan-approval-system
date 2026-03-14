package com.loanapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "loan_application")
public class LoanApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "loan_type")
    private String loanType;

    @Column(name = "pan_number")
    private String panNumber;

    @Column(name = "loan_amount")
    private Double loanAmount;

    private Double income;

    @Column(name = "credit_score")
    private Integer creditScore;

    @Column(name = "existing_loan")
    private Double existingLoan;

    @Column(name = "years_of_employment")
    private Integer yearsOfEmployment;

    private String status;
    private String reason;

    public LoanApplication() {}

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
        this.panNumber = panNumber;
    }

    public Double getLoanAmount() {
        return loanAmount;
    }

    public void setLoanAmount(Double loanAmount) {
        this.loanAmount = loanAmount;
    }

    public Double getIncome() {
        return income;
    }

    public void setIncome(Double income) {
        this.income = income;
    }

    public Integer getCreditScore() {
        return creditScore;
    }

    public void setCreditScore(Integer creditScore) {
        this.creditScore = creditScore;
    }

    public Double getExistingLoan() {
        return existingLoan;
    }

    public void setExistingLoan(Double existingLoan) {
        this.existingLoan = existingLoan;
    }

    public Integer getYearsOfEmployment() {
        return yearsOfEmployment;
    }

    public void setYearsOfEmployment(Integer yearsOfEmployment) {
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
}