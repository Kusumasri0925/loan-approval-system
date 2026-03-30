package com.loanapp.repository;

import com.loanapp.model.LoanApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LoanRepository extends JpaRepository<LoanApplication, Long> {

    List<LoanApplication> findByUserId(Long userId);

}