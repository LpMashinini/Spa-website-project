package com.Spa_website.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PayStackInitializeResponse {

    private boolean status;
    private String message;
    private PayStackData data;
}
