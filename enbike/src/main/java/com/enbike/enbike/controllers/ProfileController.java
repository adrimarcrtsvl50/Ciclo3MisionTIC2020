/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.enbike.enbike.controllers;

import com.enbike.enbike.models.POS;
import com.enbike.enbike.models.Profile;
import com.enbike.enbike.services.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping(path = "/profiles")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class ProfileController {
    
    @Autowired
    private ProfileService profileService;
    
    @GetMapping
    public ArrayList<Profile> findAll() {
        return profileService.findAll();
    }

    @GetMapping("/{id}")
    public Profile findById(@PathVariable Integer id) {
        return profileService.findById(id);
    }
    
    @PostMapping
    public Profile save(@RequestBody Profile profile) {
        return profileService.save(profile);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable(value = "id") Integer id) {
        profileService.deleteById(id);
    }

}
