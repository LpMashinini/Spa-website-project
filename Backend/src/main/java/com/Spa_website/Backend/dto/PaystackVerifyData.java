package com.Spa_website.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaystackVerifyData {

    private String id;
    private String status;
    private String reference;
    private String amount;
    private String currency;
    private String paid_at;
}

