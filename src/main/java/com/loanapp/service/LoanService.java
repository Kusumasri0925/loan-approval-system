package com.loanapp.service;

import com.loanapp.model.LoanApplication;
import com.loanapp.repository.LoanRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoanService {

    private final LoanRepository loanRepository;

    public LoanService(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
    }

    public LoanApplication applyLoan(LoanApplication loan) {

        if(loan.getCreditScore() >= 700 && loan.getIncome() >= loan.getLoanAmount() * 0.5){
            loan.setStatus("APPROVED");
            loan.setReason("Excellent credit score. Income sufficient.");
        } else {
            loan.setStatus("REJECTED");
            loan.setReason("Low credit score or insufficient income.");
        }

        return loanRepository.save(loan);
    }

    public List<LoanApplication> getLoanHistory(Long userId) {
        return loanRepository.findByUserId(userId);
    }
}