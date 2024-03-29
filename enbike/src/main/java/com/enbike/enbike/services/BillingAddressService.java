/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.enbike.enbike.services;


import com.enbike.enbike.models.Bike;
import com.enbike.enbike.models.BillingAddress;
import com.enbike.enbike.repositories.BillingAddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class BillingAddressService {
    
    @Autowired
    private BillingAddressRepository billingAddressRepository;
    
    public ArrayList<BillingAddress> findAll() {
        return (ArrayList<BillingAddress>) billingAddressRepository.findAll();
    }

    public BillingAddress findById(Integer id){ return billingAddressRepository.findById(id).get();}

    public BillingAddress save(BillingAddress billingAddress) {
        return billingAddressRepository.save(billingAddress);
    }

    public void deleteById(Integer id) {
        billingAddressRepository.deleteById(id);
    }
}
