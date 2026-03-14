package com.loanapp.service;

import com.loanapp.model.LoanOffer;
import com.loanapp.model.LoanApplication;
import com.loanapp.repository.LoanRepository;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.List;
import java.util.ArrayList;

@Service
public class LoanService {

    private final LoanRepository loanRepository;

    public LoanService(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
    }

    public LoanApplication applyLoan(LoanApplication loan){

        double score = 0;

        // Credit score contribution
        score += loan.getCreditScore() * 0.4;

        // Income factor
        double incomeFactor = loan.getLoanAmount() == 0 ? 0 :
                      loan.getIncome() / loan.getLoanAmount();
        score += incomeFactor * 30;

        // Existing loan penalty
        score -= loan.getExistingLoan() * 0.2;

        // Employment stability
        score += loan.getYearsOfEmployment() * 2;

        // Decision
        if(score > 70){
            loan.setStatus("APPROVED");
            loan.setReason("Low risk applicant with strong financial profile.");
        }
        else if(score > 50){
            loan.setStatus("REVIEW");
            loan.setReason("Moderate risk. Requires manual verification.");
        }
        else{
            loan.setStatus("REJECTED");
            loan.setReason("High default risk based on financial analysis.");
        }

        return loanRepository.save(loan);
    }
    public LoanOffer getLoanOffers(int creditScore, double income, double existingLoan, int yearsOfEmployment) {

    double riskScore = 0;

    // Credit score contribution
    riskScore += creditScore * 0.5;

    // Income stability
    riskScore += income / 10000;

    // Employment stability
    riskScore += yearsOfEmployment * 5;

    // Existing loan penalty
    riskScore -= existingLoan * 0.001;

    if (riskScore >= 400) {
        return new LoanOffer(
                7.0,
                5000000,
                riskScore,
                List.of("Home Loan", "Personal Loan", "Car Loan")
        );
    }

    else if (riskScore >= 300) {
        return new LoanOffer(
                9.0,
                2500000,
                riskScore,
                List.of("Home Loan", "Personal Loan")
        );
    }

    else if (riskScore >= 200) {
        return new LoanOffer(
                11.0,
                1000000,
                riskScore,
                List.of("Personal Loan")
        );
    }

    else {
        return new LoanOffer(
                0,
                0,
                riskScore,
                List.of("Not Eligible")
        );
    }
}
    public List<LoanApplication> getLoanHistory(Long userId) {
    return loanRepository.findByUserId(userId);
}
public List<Map<String, Object>> getEligibleLoans(int cibilScore) {

    List<Map<String, Object>> loans = new ArrayList<>();

    if(cibilScore >= 750){

        loans.add(Map.of(
            "loanType","Personal Loan",
            "interest","8%",
            "maxAmount","500000"
        ));

        loans.add(Map.of(
            "loanType","Car Loan",
            "interest","7%",
            "maxAmount","1000000"
        ));

        loans.add(Map.of(
            "loanType","Home Loan",
            "interest","6.5%",
            "maxAmount","5000000"
        ));

        loans.add(Map.of(
            "loanType","Education Loan",
            "interest","6%",
            "maxAmount","2000000"
        ));

    }
    else if(cibilScore >= 700){

        loans.add(Map.of(
            "loanType","Personal Loan",
            "interest","10%",
            "maxAmount","500000"
        ));

        loans.add(Map.of(
            "loanType","Car Loan",
            "interest","9%",
            "maxAmount","800000"
        ));

    }
    else if(cibilScore >= 650){

        loans.add(Map.of(
            "loanType","Personal Loan",
            "interest","12%",
            "maxAmount","200000"
        ));

    }

    return loans;
}
}