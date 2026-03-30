package com.loanapp.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            // ✅ Disable CSRF (for APIs)
            .csrf(csrf -> csrf.disable())

            // ✅ Allow requests
            .authorizeHttpRequests(auth -> auth
                // 🔥 AUTH APIs (public)
                .requestMatchers("/api/auth/register").permitAll()
                .requestMatchers("/api/auth/login").permitAll()
                .requestMatchers("/api/auth/verify/**").permitAll()

                // 🔥 OTHER APIs (you can secure later)
                .requestMatchers("/api/**").permitAll()

                // ✅ Everything else
                .anyRequest().permitAll()
            )

            // ❌ Disable default login
            .formLogin(form -> form.disable())

            // ❌ Disable basic auth popup
            .httpBasic(basic -> basic.disable());

        return http.build();
    }

    // 🔐 Password Encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}