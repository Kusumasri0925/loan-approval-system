package com.loanapp.controller;

import com.loanapp.model.LoanOffer;
import com.loanapp.model.LoanApplication;
import com.loanapp.service.LoanService;

import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/loan")

// ✅ Allow frontend (for now allow all)
@CrossOrigin(origins = "*")
public class LoanController {

    private final LoanService loanService;

    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    // ================= APPLY LOAN =================
    @PostMapping("/apply")
    public LoanApplication applyLoan(@RequestBody LoanApplication loan) {

        // Optional validation
        if (loan.getUserId() == null) {
            throw new RuntimeException("User ID is required");
        }

        return loanService.applyLoan(loan);
    }

    // ================= LOAN HISTORY =================
    @GetMapping("/history/{userId}")
    public List<LoanApplication> getLoanHistory(@PathVariable Long userId) {

        if (userId == null) {
            throw new RuntimeException("User ID is required");
        }

        return loanService.getLoanHistory(userId);
    }

    // ================= LOAN OFFERS =================
    @GetMapping("/offers")
    public LoanOffer getLoanOffers(
            @RequestParam int creditScore,
            @RequestParam double income,
            @RequestParam double existingLoan,
            @RequestParam int yearsOfEmployment
    ) {

        return loanService.getLoanOffers(
                creditScore,
                income,
                existingLoan,
                yearsOfEmployment
        );
    }

    // ================= ELIGIBLE LOANS (IMPORTANT FIX) =================
    @GetMapping("/eligible")
    public List<Map<String, Object>> getEligibleLoans(
            @RequestParam int cibilScore,
            @RequestParam double income
    ) {

        // ✅ validation
        if (cibilScore <= 0 || income <= 0) {
            throw new RuntimeException("Invalid input for eligibility");
        }

        return loanService.getEligibleLoans(cibilScore, income);
    }
}