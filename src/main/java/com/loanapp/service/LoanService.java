package com.loanapp.service;

import com.loanapp.model.LoanOffer;
import com.loanapp.model.LoanApplication;
import com.loanapp.repository.LoanRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class LoanService {

    private final LoanRepository loanRepository;

    public LoanService(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
    }

    // ================= EMI =================
    private double calculateEMI(double loanAmount, double annualInterestRate, int tenureMonths) {
        double monthlyRate = annualInterestRate / (12 * 100);
        return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
                (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    }

    // ================= APPLY LOAN =================
    public LoanApplication applyLoan(LoanApplication loan){

        try {

            if (loan.getUserId() == null) {
                throw new RuntimeException("User ID is missing!");
            }

            if (loan.getPanNumber() == null ||
                    !loan.getPanNumber().matches("^[A-Z]{5}[0-9]{4}[A-Z]{1}$")) {
                throw new RuntimeException("Invalid PAN format");
            }

            double income = loan.getIncome();
            double existingLoan = loan.getExistingLoan();
            int creditScore = loan.getCreditScore();
            int employment = loan.getYearsOfEmployment();
            double loanAmount = loan.getLoanAmount();

            if (income <= 0) {
                throw new RuntimeException("Income must be greater than zero");
            }

            // ================= EMI RULE =================
            double emi = calculateEMI(loanAmount, 10.0, 60);
            double emiRatio = emi / income;

            loan.setEmi(emi);

            // ================= BASIC AI LOGIC =================
            String status;
            String reason;
            double riskScore;

            if (emiRatio > 0.4) {

                status = "REJECTED";
                reason = "EMI exceeds 40% of income";
                riskScore = 90;

            } else if (creditScore >= 750 && income > 50000) {

                status = "APPROVED";
                reason = "Excellent credit score and high income";
                riskScore = 20;

            } else if (creditScore >= 700 && income > 30000) {

                status = "APPROVED";
                reason = "Good credit score and stable income";
                riskScore = 35;

            } else if (creditScore >= 650 && income > 20000) {

                status = "APPROVED";
                reason = "Moderate credit profile";
                riskScore = 50;

            } else {

                status = "REJECTED";
                reason = "Low credit score or insufficient income";
                riskScore = 75;
            }

            loan.setStatus(status);
            loan.setReason(reason);
            loan.setRiskScore(riskScore);

            // ================= HUMAN READABLE EXPLANATION =================
            loan.setExplanation(generateExplanation(loan, emiRatio));

            return loanRepository.save(loan);

        } catch (Exception e) {
            throw new RuntimeException("Loan processing failed: " + e.getMessage());
        }
    }

    // ================= CLEAN EXPLANATION =================
    private String generateExplanation(LoanApplication loan, double emiRatio) {

        StringBuilder explanation = new StringBuilder("AI Analysis:\n");

        if (loan.getCreditScore() >= 700) {
            explanation.append("• Your credit score is strong.\n");
        } else {
            explanation.append("• Your credit score is low.\n");
        }

        if (loan.getIncome() > 30000) {
            explanation.append("• Your income is stable.\n");
        } else {
            explanation.append("• Your income is low.\n");
        }

        if (loan.getExistingLoan() > 50000) {
            explanation.append("• You already have high existing loans.\n");
        }

        if (loan.getYearsOfEmployment() >= 2) {
            explanation.append("• Your employment history is stable.\n");
        } else {
            explanation.append("• Your employment history is short.\n");
        }

        if (emiRatio > 0.4) {
            explanation.append("• EMI is too high compared to your income.\n");
        }

        return explanation.toString();
    }

    // ================= HISTORY =================
    public List<LoanApplication> getLoanHistory(Long userId) {
        return loanRepository.findByUserId(userId);
    }

    // ================= LOAN OFFERS =================
    public LoanOffer getLoanOffers(int creditScore, double income, double existingLoan, int yearsOfEmployment) {

        double riskScore =
                creditScore * 0.4 +
                (income / 10000) * 0.3 -
                (existingLoan / 10000) * 0.2 +
                yearsOfEmployment * 0.1;

        if (riskScore >= 300) {
            return new LoanOffer(7.0, 5000000, riskScore,
                    List.of("Home Loan", "Personal Loan", "Car Loan"));
        }
        else if (riskScore >= 250) {
            return new LoanOffer(9.0, 2500000, riskScore,
                    List.of("Home Loan", "Personal Loan"));
        }
        else if (riskScore >= 200) {
            return new LoanOffer(11.0, 1000000, riskScore,
                    List.of("Personal Loan"));
        }
        else {
            return new LoanOffer(0, 0, riskScore,
                    List.of("Not Eligible"));
        }
    }

    // ================= ELIGIBLE LOANS =================
    public List<Map<String, Object>> getEligibleLoans(int cibilScore, double income) {

        List<Map<String, Object>> loans = new ArrayList<>();

        if (cibilScore >= 750 && income > 50000) {

            loans.add(Map.of("loanType","Home Loan","interest","6.5%","maxAmount","5000000"));
            loans.add(Map.of("loanType","Car Loan","interest","7%","maxAmount","1000000"));
            loans.add(Map.of("loanType","Personal Loan","interest","8%","maxAmount","500000"));

        }
        else if (cibilScore >= 700 && income > 30000) {

            loans.add(Map.of("loanType","Car Loan","interest","9%","maxAmount","800000"));
            loans.add(Map.of("loanType","Personal Loan","interest","10%","maxAmount","500000"));

        }
        else if (cibilScore >= 650 && income > 15000) {

            loans.add(Map.of("loanType","Personal Loan","interest","12%","maxAmount","200000"));

        }

        return loans;
    }
}