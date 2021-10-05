/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.enbike.enbike.controllers;

import com.enbike.enbike.models.Card;
import com.enbike.enbike.models.POS;
import com.enbike.enbike.services.POSService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping(path = "/pos")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class POSController {
    
    @Autowired
    private POSService posService;
    
    @GetMapping
    public ArrayList<POS> findAll() {
        return posService.findAll();
    }

    @GetMapping("{id}")
    public POS findById(@PathVariable Integer id) {
        return posService.findById(id);
    }
    
    @PostMapping
    public POS save(@RequestBody POS pos) {
        return posService.save(pos);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Integer id) {
        posService.deleteById(id);
    }

}
