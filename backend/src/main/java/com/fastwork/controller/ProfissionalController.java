package com.fastwork.controller;

import com.fastwork.model.Profissional;
import com.fastwork.repository.ProfissionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/profissionais")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfissionalController {

    @Autowired
    private ProfissionalRepository profissionalRepository;

    @GetMapping
    public List<Profissional> listarProfissionais() {
        return profissionalRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profissional> buscarProfissional(@PathVariable Integer id) {
        Optional<Profissional> profissional = profissionalRepository.findById(id);
        return profissional.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Profissional> atualizarProfissional(@PathVariable Integer id, @RequestBody Profissional profissionalAtualizado) {
        Optional<Profissional> profissionalExistente = profissionalRepository.findById(id);
        if (profissionalExistente.isPresent()) {
            Profissional profissional = profissionalExistente.get();
            profissional.setNome(profissionalAtualizado.getNome());
            profissional.setTelefone(profissionalAtualizado.getTelefone());
            profissional.setRegiao(profissionalAtualizado.getRegiao());
            profissional.setHabilidades(profissionalAtualizado.getHabilidades());
            profissional.setDescricao(profissionalAtualizado.getDescricao());
            return ResponseEntity.ok(profissionalRepository.save(profissional));
        }
        return ResponseEntity.notFound().build();
    }
}