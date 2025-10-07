package com.fastwork.repository;

import com.fastwork.model.Profissional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfissionalRepository extends JpaRepository<Profissional, Integer> {
    Profissional findByEmail(String email);
}