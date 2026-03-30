package com.loanapp.service;

import com.loanapp.model.LoanOffer;
import com.loanapp.model.LoanApplication;
import com.loanapp.repository.LoanRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

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

            // ================= SHAP CALL =================
            Map<String, Double> shapValues = new HashMap<>();

            try {
                RestTemplate restTemplate = new RestTemplate();

                String url = "http://127.0.0.1:5001/predict";

                Map<String, Object> request = Map.of(
                        "creditScore", creditScore,
                        "income", income,
                        "existingLoan", existingLoan,
                        "employment", employment
                );

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);

                HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);

                ResponseEntity<Map> response =
                        restTemplate.postForEntity(url, entity, Map.class);

                Map<String, Object> body = response.getBody();

                if (body != null && body.get("explanation") != null) {
                    Map<String, Object> shap =
                            (Map<String, Object>) body.get("explanation");

                    shap.forEach((k, v) ->
                            shapValues.put(k, Double.parseDouble(v.toString()))
                    );
                }

            } catch (Exception e) {
                System.out.println("SHAP error: " + e.getMessage());
            }

            // ================= EMI RULE =================
            double emi = calculateEMI(loanAmount, 10.0, 60);
            double emiRatio = emi / income;

            loan.setEmi(emi);

            if (emiRatio > 0.4) {

                loan.setStatus("REJECTED");
                loan.setReason("EMI exceeds 40% of monthly income");
                loan.setRiskScore(100.0);
                loan.setExplanation(generateReadableExplanation(shapValues));

                return loanRepository.save(loan);
            }

            // ================= SCORE =================
            double score =
                    creditScore * 0.4 +
                    (income / 10000) * 0.3 -
                    (existingLoan / 10000) * 0.2 +
                    employment * 0.1;

            loan.setRiskScore(score);

            if(score >= 250){
                loan.setStatus("APPROVED");
                loan.setReason("Low risk applicant");
            } else {
                loan.setStatus("REJECTED");
                loan.setReason("High risk applicant");
            }

            // ✅ ONLY SHAP EXPLANATION
            loan.setExplanation(generateReadableExplanation(shapValues));

            return loanRepository.save(loan);

        } catch (Exception e) {
            throw new RuntimeException("Loan processing failed: " + e.getMessage());
        }
    }

    // ================= 🔥 HUMAN READABLE SHAP =================
    private String generateReadableExplanation(Map<String, Double> shapValues) {

        StringBuilder explanation = new StringBuilder("AI Analysis:\n");

        for (Map.Entry<String, Double> entry : shapValues.entrySet()) {

            String feature = entry.getKey();
            double value = entry.getValue();

            if (feature.equals("income")) {
                if (value < 0)
                    explanation.append("• Your income is low, increasing risk.\n");
                else
                    explanation.append("• Your income is strong, supporting approval.\n");
            }

            else if (feature.equals("creditScore")) {
                if (value < 0)
                    explanation.append("• Your credit score is low.\n");
                else
                    explanation.append("• Your credit score is good.\n");
            }

            else if (feature.equals("existingLoan")) {
                if (value < 0)
                    explanation.append("• You already have high existing loans.\n");
                else
                    explanation.append("• Your existing loan burden is low.\n");
            }

            else if (feature.equals("employment")) {
                if (value < 0)
                    explanation.append("• Your employment history is unstable.\n");
                else
                    explanation.append("• Your employment history is stable.\n");
            }
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