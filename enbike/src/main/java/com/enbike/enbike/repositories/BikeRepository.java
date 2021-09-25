/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.enbike.enbike.repositories;

import com.enbike.enbike.models.Bike;
import com.enbike.enbike.models.Bike;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author JDPT93
 */
@Repository
public interface BikeRepository extends CrudRepository<Bike, Integer> {
    
}
