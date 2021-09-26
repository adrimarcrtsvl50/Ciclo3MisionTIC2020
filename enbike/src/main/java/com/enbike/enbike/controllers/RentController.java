/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.enbike.enbike.controllers;

import com.enbike.enbike.models.Rent;
import com.enbike.enbike.services.RentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping(path = "/rents")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST })
public class RentController {
    
    @Autowired
    private RentService RentService;
    
    @GetMapping
    public ArrayList<Rent> findAll() {
        return RentService.findAll();
    }
    
    @PostMapping
    public Rent save(@RequestBody Rent rent) {
        return RentService.save(rent);
    }

}
