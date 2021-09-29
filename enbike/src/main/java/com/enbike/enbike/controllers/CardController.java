/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.enbike.enbike.controllers;

import com.enbike.enbike.models.Card;
import com.enbike.enbike.services.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping(path = "/cards")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class CardController {
    
    @Autowired
    private CardService cardService;
    
    @GetMapping
    public ArrayList<Card> findAll() {
        return cardService.findAll();
    }
    
    @PostMapping
    public Card save(@RequestBody Card card) {
        return cardService.save(card);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable(value = "id") Integer id) {
        cardService.deleteById(id);
    }

}
