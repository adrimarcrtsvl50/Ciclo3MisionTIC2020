/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.enbike.enbike.repositories;

import com.enbike.enbike.models.POS;
import com.enbike.enbike.models.Rent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface POSRepository extends JpaRepository<POS, Integer> {
    
}
