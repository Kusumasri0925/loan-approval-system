package com.loanapp.controller;

import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import java.util.Optional;

import com.loanapp.model.User;
import com.loanapp.repository.UserRepository;
import com.loanapp.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private JwtUtil jwtUtil;

    // ================= REGISTER =================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user){

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if(existingUser.isPresent()){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Email already registered");
        }

        // ✅ VALIDATE INCOME
        if(user.getIncome() <= 0){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Income must be greater than 0");
        }

        // ✅ VALIDATE CIBIL
        if(user.getCibilScore() < 300 || user.getCibilScore() > 900){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Invalid CIBIL score");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setVerified(false);

        User savedUser = userRepository.save(user);

        String verificationLink = "http://localhost:8080/api/auth/verify/" + savedUser.getId();

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(savedUser.getEmail());
            message.setSubject("Verify your account");
            message.setText("Click the link to verify your account:\n\n" + verificationLink);

            mailSender.send(message);
        } catch(Exception e){
            System.out.println("Mail sending failed: " + e.getMessage());
        }

        return ResponseEntity.ok("Registration successful. Please verify your email.");
    }

    // ================= VERIFY =================
    @GetMapping("/verify/{id}")
    public void verifyUser(@PathVariable Long id, HttpServletResponse response) throws IOException {

        Optional<User> userOptional = userRepository.findById(id);

        if(userOptional.isPresent()){
            User user = userOptional.get();
            user.setVerified(true);
            userRepository.save(user);

            response.sendRedirect("http://localhost:5173/login?verified=true");
        } else {
            response.sendRedirect("http://localhost:5173/login?error=invalid_link");
        }
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

        if(!user.isVerified()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Please verify your email before login");
        }

        if(!passwordEncoder.matches(loginUser.getPassword(), user.getPassword())){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        // ✅ SAFE RESPONSE (NO PASSWORD)
        return ResponseEntity.ok(Map.of(
                "token", token,
                "user", Map.of(
                        "id", user.getId(),
                        "name", user.getName(),
                        "email", user.getEmail(),
                        "cibilScore", user.getCibilScore(),
                        "income", user.getIncome(),   // ✅ IMPORTANT
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

        User user = userOptional.get();

        String resetLink = "http://localhost:5173/reset-password/" + user.getId();

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Password Reset");
            message.setText("Click the link below:\n\n" + resetLink);

            mailSender.send(message);
        } catch(Exception e){
            System.out.println("Mail sending failed: " + e.getMessage());
        }

        return ResponseEntity.ok("Reset link sent to your email");
    }

    // ================= RESET PASSWORD =================
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String,String> data){

        Long id = Long.parseLong(data.get("id"));
        String password = data.get("password");

        Optional<User> userOptional = userRepository.findById(id);

        if(userOptional.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found");
        }

        User user = userOptional.get();

        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);

        return ResponseEntity.ok("Password reset successful");
    }
}