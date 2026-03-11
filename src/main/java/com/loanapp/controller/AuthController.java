package com.loanapp.controller;

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
@CrossOrigin(origins = "http://localhost:3000")
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

        Optional<User> existing = userRepository.findByEmail(user.getEmail());

        if(existing.isPresent()){
            return ResponseEntity.badRequest().body("Email already registered");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setVerified(false);

        User savedUser = userRepository.save(user);

        String verifyLink = "http://localhost:8080/api/auth/verify/" + savedUser.getId();

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(savedUser.getEmail());
        message.setSubject("Loan App Email Verification");
        message.setText("Click the link to verify your account:\n\n" + verifyLink);

        mailSender.send(message);

        return ResponseEntity.ok("Verification email sent");
    }


    // ================= VERIFY EMAIL =================

    @GetMapping("/verify/{id}")
    public ResponseEntity<?> verifyUser(@PathVariable Long id){

        Optional<User> userOptional = userRepository.findById(id);

        if(userOptional.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found");
        }

        User user = userOptional.get();
        user.setVerified(true);

        userRepository.save(user);

        return ResponseEntity.ok("Email verified successfully. You can now login.");
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

    return ResponseEntity.ok(Map.of(
            "token", token,
            "user", user
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

        String resetLink = "http://localhost:3000/reset-password/" + user.getId();

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("Loan App Password Reset");
        message.setText("Click the link below to reset your password:\n\n" + resetLink);

        mailSender.send(message);

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