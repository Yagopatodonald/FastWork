package com.fastwork.controller;

import com.fastwork.model.*;
import com.fastwork.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        if (authService.authenticate(request.getEmail(), request.getPassword())) {
            String token = authService.generateToken(request.getEmail());
            return ResponseEntity.ok(new LoginResponse(true, "Login realizado com sucesso", token));
        }
        return ResponseEntity.badRequest()
                .body(new LoginResponse(false, "Email ou senha inválidos", null));
    }
    
    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@Valid @RequestBody RegisterRequest request) {
        try {
            System.out.println("Recebendo requisição de cadastro para: " + request.getEmail());
            if (authService.registerUser(request)) {
                String token = authService.generateToken(request.getEmail());
                return ResponseEntity.ok(new LoginResponse(true, "Cadastro realizado com sucesso", token));
            }
            return ResponseEntity.badRequest()
                    .body(new LoginResponse(false, "Erro ao realizar cadastro", null));
        } catch (Exception e) {
            System.err.println("Erro no cadastro: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new LoginResponse(false, "Erro: " + e.getMessage(), null));
        }
    }
}