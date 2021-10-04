/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.enbike.enbike.controllers;

import com.enbike.enbike.models.Profile;
import com.enbike.enbike.models.Rent;
import com.enbike.enbike.services.RentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping(path = "/rents")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class RentController {
    
    @Autowired
    private RentService rentService;
    
    @GetMapping
    public ArrayList<Rent> findAll() {
        return rentService.findAll();
    }

    @GetMapping("/{id}")
    public Rent findById(@PathVariable Integer id) {
        return rentService.findById(id);
    }
    
    @PostMapping
    public Rent save(@RequestBody Rent rent) {
        return rentService.save(rent);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable(value = "id") Integer id) {
        rentService.deleteById(id);
    }

}
