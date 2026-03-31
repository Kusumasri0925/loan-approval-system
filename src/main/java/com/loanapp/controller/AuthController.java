package com.loanapp.controller;

import java.util.Map;
import java.util.Optional;

import com.loanapp.model.User;
import com.loanapp.repository.UserRepository;
import com.loanapp.security.JwtUtil;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // ================= REGISTER =================
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user){

        // ✅ Gmail validation (extra safety)
        if(!user.getEmail().matches("^[a-zA-Z0-9._%+-]+@gmail\\.com$")){
            return ResponseEntity
                    .badRequest()
                    .body("Only Gmail addresses are allowed");
        }

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if(existingUser.isPresent()){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Email already registered");
        }

        // ✅ Business validations
        if(user.getIncome() < 1000){
            return ResponseEntity
                    .badRequest()
                    .body("Income must be at least 1000");
        }

        if(user.getCibilScore() < 300 || user.getCibilScore() > 900){
            return ResponseEntity
                    .badRequest()
                    .body("CIBIL score must be between 300 and 900");
        }

        // ✅ Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // ✅ Auto verify (email removed)
        user.setVerified(true);

        userRepository.save(user);

        return ResponseEntity.ok("Registration successful");
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {

        Optional<User> userOptional = userRepository.findByEmail(loginUser.getEmail());

        if(userOptional.isEmpty()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("User not found");
        }

        User user = userOptional.get();

        if(!passwordEncoder.matches(loginUser.getPassword(), user.getPassword())){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "user", Map.of(
                        "id", user.getId(),
                        "name", user.getName(),
                        "email", user.getEmail(),
                        "cibilScore", user.getCibilScore(),
                        "income", user.getIncome(),
                        "verified", user.isVerified()
                )
        ));
    }

    // ================= FORGOT PASSWORD =================
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String,String> data){

        String email = data.get("email");

        Optional<User> userOptional = userRepository.findByEmail(email);

        if(userOptional.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found");
        }

        return ResponseEntity.ok("Proceed to reset password");
    }

    // ================= RESET PASSWORD =================
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String,String> data){

        try {
            Long id = Long.parseLong(data.get("id"));
            String password = data.get("password");

            if(password == null || password.length() < 6){
                return ResponseEntity.badRequest()
                        .body("Password must be at least 6 characters");
            }

            Optional<User> userOptional = userRepository.findById(id);

            if(userOptional.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("User not found");
            }

            User user = userOptional.get();

            user.setPassword(passwordEncoder.encode(password));
            userRepository.save(user);

            return ResponseEntity.ok("Password reset successful");

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body("Invalid request data");
        }
    }
}