/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.enbike.enbike.controllers;

import com.enbike.enbike.models.POS;
import com.enbike.enbike.services.POSService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping(path = "/pos")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST })
public class POSController {
    
    @Autowired
    private POSService POSService;
    
    @GetMapping
    public ArrayList<POS> findAll() {
        return POSService.findAll();
    }
    
    @PostMapping
    public POS save(@RequestBody POS pos) {
        return POSService.save(pos);
    }

    @PostMapping("/delete/{id}")
    public void delete(@PathVariable(value = "id") Integer id) {
        POSService.deleteById(id);
    }

}
