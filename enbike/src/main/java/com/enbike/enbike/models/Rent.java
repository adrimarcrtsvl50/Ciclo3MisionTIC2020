/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.enbike.enbike.models;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "rent")
public class Rent {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)
    private Integer id;
    
    @Column(nullable = false)
    private Date fechaInicial;
    
    @Column(nullable = false)
    private Date fechaFinal;
    
    @Column
    private Date fechaEntrega;

    @Column
    private Integer duracionEstimada;

    @Column
    private Integer duracionReal;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getFechaInicial() {
        return fechaInicial;
    }

    public void setFechaInicial(Date fechaInicial) {
        this.fechaInicial = fechaInicial;
    }

    public Date getFechaFinal() {
        return fechaFinal;
    }

    public void setFechaFinal(Date fechaFinal) {
        this.fechaFinal = fechaFinal;
    }

    public Date getFechaEntrega() {
        return fechaEntrega;
    }

    public void setFechaEntrega(Date fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }

    public Integer getDuracionEstimada() {
        return duracionEstimada;
    }

    public void setDuracionEstimada(Integer duracionEstimada) {
        this.duracionEstimada = duracionEstimada;
    }

    public Integer getDuracionReal() {
        return duracionReal;
    }

    public void setDuracionReal(Integer duracionReal) {
        this.duracionReal = duracionReal;
    }

    @ManyToOne(optional = false)
    private Bike fk_id_bike;

    public Bike getFk_id_bike() {
        return fk_id_bike;
    }

    public void setFk_id_bike(Bike fk_id_bike) {
        this.fk_id_bike = fk_id_bike;
    }

    @OneToOne(optional = false)
    private Profile fk_id_profile;

    public Profile getFk_id_profile() {
        return fk_id_profile;
    }

    public void setFk_id_profile(Profile fk_id_profile) {
        this.fk_id_profile = fk_id_profile;
    }

    @OneToOne(optional = false)
    private POS fk_id_pos;

    public POS getFk_id_pos() {
        return fk_id_pos;
    }

    public void setFk_id_pos(POS fk_id_pos) {
        this.fk_id_pos = fk_id_pos;
    }
}
