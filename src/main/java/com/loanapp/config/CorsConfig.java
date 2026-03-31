package com.loanapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {

        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(CorsRegistry registry) {

                registry.addMapping("/**")

                        // ✅ Allow both local + deployed frontend
                        .allowedOrigins(
                                "http://localhost:5173",
                                "https://your-frontend-url.vercel.app"
                        )

                        // ✅ Allow all required methods
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")

                        // ✅ Allow headers
                        .allowedHeaders("*")

                        // ❌ REMOVE this (causes issues)
                        // .allowCredentials(true)

                        .maxAge(3600);
            }
        };
    }
}