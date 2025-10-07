package com.fastwork.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Profissional")
public class Profissional {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "nome", length = 100, nullable = false)
    private String nome;

    @Column(name = "email", length = 100, unique = true, nullable = false)
    private String email;

    @Column(name = "telefone", length = 15)
    private String telefone;

    @Column(name = "senha", length = 50, nullable = false)
    private String senha;

    @Column(name = "regiao", length = 100, nullable = false)
    private String regiao;

    @Column(name = "nivelAcesso", length = 12)
    private String nivelAcesso;

    @Column(name = "dataCadastro", nullable = false)
    private LocalDateTime dataCadastro;

    @Column(name = "habilidades", length = 250, nullable = false)
    private String habilidades;

    @Column(name = "descricao", length = 250)
    private String descricao;

    @Column(name = "numAvaliacoes")
    private Integer numAvaliacoes;

    @Column(name = "statusUsuario", length = 12, nullable = false)
    private String statusUsuario;

    public Profissional() {}

    // Getters e Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
    public String getRegiao() { return regiao; }
    public void setRegiao(String regiao) { this.regiao = regiao; }
    public String getNivelAcesso() { return nivelAcesso; }
    public void setNivelAcesso(String nivelAcesso) { this.nivelAcesso = nivelAcesso; }
    public LocalDateTime getDataCadastro() { return dataCadastro; }
    public void setDataCadastro(LocalDateTime dataCadastro) { this.dataCadastro = dataCadastro; }
    public String getHabilidades() { return habilidades; }
    public void setHabilidades(String habilidades) { this.habilidades = habilidades; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public Integer getNumAvaliacoes() { return numAvaliacoes; }
    public void setNumAvaliacoes(Integer numAvaliacoes) { this.numAvaliacoes = numAvaliacoes; }
    public String getStatusUsuario() { return statusUsuario; }
    public void setStatusUsuario(String statusUsuario) { this.statusUsuario = statusUsuario; }
}