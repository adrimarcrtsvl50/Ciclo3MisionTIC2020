/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.enbike.enbike.services;


import com.enbike.enbike.models.Profile;
import com.enbike.enbike.repositories.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ProfileService {
    
    @Autowired
    private ProfileRepository profileRepository;
    
    public ArrayList<Profile> findAll() {
        return (ArrayList<Profile>) profileRepository.findAll();
    }

    public Profile save(Profile profile) {
        return profileRepository.save(profile);
    }

    public void deleteById(Integer id) {
        profileRepository.deleteById(id);
    }
}
