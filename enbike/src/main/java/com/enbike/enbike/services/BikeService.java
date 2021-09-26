/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.enbike.enbike.services;

import com.enbike.enbike.models.Bike;
import com.enbike.enbike.repositories.BikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class BikeService {
    
    @Autowired
    private BikeRepository bikeRepository;

    public ArrayList<Bike> findAll() {
        return (ArrayList<Bike>) bikeRepository.findAll();
    }

    public Bike getById(Integer id){ return bikeRepository.getById(id);}

    public Bike save(Bike bike) {
        return bikeRepository.save(bike);
    }

    public void deleteById(Integer id) {
        bikeRepository.deleteById(id);
    }

}
