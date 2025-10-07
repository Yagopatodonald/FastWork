package com.fastwork.repository;

import com.fastwork.model.Contratante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContratanteRepository extends JpaRepository<Contratante, Integer> {
    Contratante findByEmail(String email);
}