/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.enbike.enbike.controllers;

import com.enbike.enbike.models.BillingAddress;
import com.enbike.enbike.services.BillingAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping(path = "/billingAddress")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST })
public class BillingAddressController {
    
    @Autowired
    private BillingAddressService billingAddressService;
    
    @GetMapping
    public ArrayList<BillingAddress> findAll() {
        return billingAddressService.findAll();
    }
    
    @PostMapping
    public BillingAddress save(@RequestBody BillingAddress billingAddress) {
        return billingAddressService.save(billingAddress);
    }

    @PostMapping("/delete/{id}")
    public void delete(@PathVariable(value = "id") Integer id) {
        billingAddressService.deleteById(id);
    }

}
