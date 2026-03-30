package com.loanapp.controller;

import com.loanapp.model.LoanOffer;
import com.loanapp.model.LoanApplication;
import com.loanapp.service.LoanService;

import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/loan")
@CrossOrigin(origins = "http://localhost:3000")
public class LoanController {

    private final LoanService loanService;

    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    // ================= APPLY LOAN =================
    @PostMapping("/apply")
    public LoanApplication applyLoan(@RequestBody LoanApplication loan) {
        return loanService.applyLoan(loan);
    }

    // ================= HISTORY =================
    @GetMapping("/history/{userId}")
    public List<LoanApplication> getLoanHistory(@PathVariable Long userId) {
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
        return loanService.getLoanOffers(creditScore, income, existingLoan, yearsOfEmployment);
    }

    // ================= ✅ FIXED ELIGIBLE LOANS =================
    @GetMapping("/eligible")
    public List<Map<String, Object>> getEligibleLoans(
            @RequestParam int cibilScore,
            @RequestParam double income
    ) {
        return loanService.getEligibleLoans(cibilScore, income);
    }
}