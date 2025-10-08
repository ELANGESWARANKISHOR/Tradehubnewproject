package com.tradehub.user_service.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                
    private String username;         
    private String email;           
    private String password;         
    private String confirmPassword;  
    private double latitude;         
    private double longitude;        
    private String district;         
    private String contactNumber;    

    @ElementCollection
    private List<CartItem> cart = new ArrayList<>();
}
