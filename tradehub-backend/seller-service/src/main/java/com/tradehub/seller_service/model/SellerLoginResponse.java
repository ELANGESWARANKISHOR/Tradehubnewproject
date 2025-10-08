package com.tradehub.seller_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SellerLoginResponse {
    private Long id;
    private String shopname;
    private String email;
    private String token;
}