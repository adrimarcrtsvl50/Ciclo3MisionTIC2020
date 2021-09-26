/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.enbike.enbike.controllers;

import com.enbike.enbike.models.Profile;
import com.enbike.enbike.services.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping(path = "/profiles")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST })
public class ProfileController {
    
    @Autowired
    private ProfileService ProfileService;
    
    @GetMapping
    public ArrayList<Profile> findAll() {
        return ProfileService.findAll();
    }
    
    @PostMapping
    public Profile save(@RequestBody Profile profile) {
        return ProfileService.save(profile);
    }

}
