/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.enbike.enbike.services;


import com.enbike.enbike.models.Card;
import com.enbike.enbike.repositories.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CardService {
    
    @Autowired
    private CardRepository cardRepository;
    
    public ArrayList<Card> findAll() {
        return (ArrayList<Card>) cardRepository.findAll();
    }

    public Card save(Card card) {
        return cardRepository.save(card);
    }
    
}
