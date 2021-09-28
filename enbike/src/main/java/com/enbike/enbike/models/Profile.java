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
    private Date fechaNacimiento;

    @Column(nullable = false)
    private String tipoUsuario;

    @Column(nullable = false)
    private String contrasena;

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

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Date fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
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
