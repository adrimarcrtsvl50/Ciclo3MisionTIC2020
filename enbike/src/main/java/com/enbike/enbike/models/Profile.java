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
public class Profile {
    
    @Id
    @Column(nullable = false, unique = true)
    private Integer id;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column(nullable = false)
    private String apellido;
    
    @Column(nullable = false)
    private String tipodocumento;

    @Column(nullable = false)
    private String tipo;

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

    public String getTipodocumento() {
        return tipodocumento;
    }

    public void setTipodocumento(String tipodocumento) {
        this.tipodocumento = tipodocumento;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    @OneToOne
    private Card fk_id_card;

    public Card getFk_id_card() {
        return fk_id_card;
    }

    public void setFk_id_card(Card fk_id_card) {
        this.fk_id_card = fk_id_card;
    }
}
