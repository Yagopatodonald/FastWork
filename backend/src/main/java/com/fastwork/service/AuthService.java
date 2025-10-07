package com.fastwork.service;

import com.fastwork.model.*;
import com.fastwork.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class AuthService {
    
    @Autowired
    private ProfissionalRepository profissionalRepository;
    
    @Autowired
    private ContratanteRepository contratanteRepository;
    
    public boolean authenticate(String email, String password) {
        Profissional profissional = profissionalRepository.findByEmail(email);
        if (profissional != null && profissional.getSenha().equals(password) && "ATIVO".equals(profissional.getStatusUsuario())) {
            return true;
        }
        
        Contratante contratante = contratanteRepository.findByEmail(email);
        return contratante != null && contratante.getSenha().equals(password) && "ATIVO".equals(contratante.getStatusUsuario());
    }
    
    public String generateToken(String email) {
        return "token_" + email.hashCode();
    }
    
    public boolean registerUser(RegisterRequest request) {
        try {
            System.out.println("Tentando registrar usuário: " + request.getEmail());
            
            if (request.isWantToAdvertise()) {
                System.out.println("Registrando como profissional");
                Profissional profissional = new Profissional();
                profissional.setNome(request.getName());
                profissional.setEmail(request.getEmail());
                profissional.setSenha(request.getPassword());
                profissional.setTelefone(request.getTelefone());
                profissional.setRegiao(request.getRegiao() != null && !request.getRegiao().isEmpty() ? request.getRegiao() : "Não informado");
                profissional.setHabilidades(request.getHabilidades() != null && !request.getHabilidades().isEmpty() ? request.getHabilidades() : "Não informado");
                profissional.setDescricao(request.getDescricao() != null && !request.getDescricao().isEmpty() ? request.getDescricao() : "Profissional qualificado");
                profissional.setNivelAcesso("PROFISSIONAL");
                profissional.setDataCadastro(LocalDateTime.now());
                profissional.setStatusUsuario("ATIVO");
                profissional.setNumAvaliacoes(0);
                profissionalRepository.save(profissional);
                System.out.println("Profissional salvo com sucesso");
            } else {
                System.out.println("Registrando como contratante");
                Contratante contratante = new Contratante();
                contratante.setNome(request.getName());
                contratante.setEmail(request.getEmail());
                contratante.setSenha(request.getPassword());
                contratante.setNivelAcesso("VISUALIZADOR");
                contratante.setDataCadastro(LocalDateTime.now());
                contratante.setStatusUsuario("ATIVO");
                contratanteRepository.save(contratante);
                System.out.println("Contratante salvo com sucesso");
            }
            return true;
        } catch (Exception e) {
            System.err.println("Erro ao registrar usuário: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
}