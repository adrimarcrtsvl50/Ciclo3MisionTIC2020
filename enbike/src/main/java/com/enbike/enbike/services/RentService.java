/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.enbike.enbike.services;


import com.enbike.enbike.models.Rent;
import com.enbike.enbike.repositories.RentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class RentService {
    
    @Autowired
    private RentRepository rentRepository;
    
    public ArrayList<Rent> findAll() {
        return (ArrayList<Rent>) rentRepository.findAll();
    }

    public Rent save(Rent rent) {
        return rentRepository.save(rent);
    }

    public void deleteById(Integer id) {
        rentRepository.deleteById(id);
    }
}
