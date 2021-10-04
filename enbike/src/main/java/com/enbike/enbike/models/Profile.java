/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.enbike.enbike.models;

import javax.persistence.*;
import javax.security.auth.callback.PasswordCallback;
import java.sql.Date;

@Entity
@Table(name = "profile")
public class Profile {
    
    @Id
    @Column(nullable = false, unique = true)
    private Integer id;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column(nullable = false)
    private String apellido;

    @Column(nullable = false)
    private String tipodedocumento;
    
    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String tipoUsuario;

    @Column(nullable = false)
    private String contrasena;

    @Column(nullable = false)
    private String recontrasena;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTipodedocumento() {
        return tipodedocumento;
    }

    public void setTipodedocumento(String tipodedocumento) {
        this.tipodedocumento = tipodedocumento;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrsena(String contrasena) {
        this.contrasena = contrasena;
    }

    public String getRecontrasena() {
        return recontrasena;
    }

    public void setRecontrsena(String recontrasena) {
        this.recontrasena = recontrasena;
    }

    @ManyToOne(optional = false)
    private Card fk_id_profile;

    public Card getFk_id_profile() {
        return fk_id_profile;
    }

    public void setFk_id_profile(Card fk_id_profile) {
        this.fk_id_profile = fk_id_profile;
    }

    @OneToOne(mappedBy = "fk_rent_prof", optional = false)
    private Rent id_rent;

    public Rent getId_rent() {
        return id_rent;
    }

    public void setId_rent(Rent id_rent) {
        this.id_rent = id_rent;
    }
}
