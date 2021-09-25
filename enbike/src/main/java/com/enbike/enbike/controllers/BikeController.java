/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.enbike.enbike.controllers;

import com.enbike.enbike.models.Bike;
import com.enbike.enbike.services.BikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping(path = "/bikes")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST })
public class BikeController {
    
    @Autowired
    private BikeService bikeService;
    
    @GetMapping
    public ArrayList<Bike> findAll() {
        return bikeService.findAll();
    }
    
    @PostMapping
    public Bike save(@RequestBody Bike bike) {
        return bikeService.save(bike);
    }

}
