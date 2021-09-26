/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.enbike.enbike.models;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "POS")
public class POS {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)
    private Integer id;
    
    @Column(nullable = false)
    private Long SubTotal;
    
    @Column()
    private Long multa;
    
    @Column(nullable = false)
    private Long iva;

    @Column(nullable = false)
    private Long total;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Long getSubTotal() {
        return SubTotal;
    }

    public void setSubTotal(Long subTotal) {
        SubTotal = subTotal;
    }

    public Long getMulta() {
        return multa;
    }

    public void setMulta(Long multa) {
        this.multa = multa;
    }

    public Long getIva() {
        return iva;
    }

    public void setIva(Long iva) {
        this.iva = iva;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}
