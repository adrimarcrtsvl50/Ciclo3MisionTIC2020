/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.enbike.enbike.services;


import com.enbike.enbike.models.POS;
import com.enbike.enbike.repositories.POSRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class POSService {
    
    @Autowired
    private POSRepository posRepository;
    
    public ArrayList<POS> findAll() {
        return (ArrayList<POS>) posRepository.findAll();
    }

    public POS save(POS pos) {
        return posRepository.save(pos);
    }

    public void deleteById(Integer id) {
        posRepository.deleteById(id);
    }
}
