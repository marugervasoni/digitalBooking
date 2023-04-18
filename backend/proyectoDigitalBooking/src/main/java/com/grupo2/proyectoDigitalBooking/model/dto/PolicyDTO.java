package com.grupo2.proyectoDigitalBooking.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PolicyDTO {

    private Long id;

    private String title;

    private String description;
}
