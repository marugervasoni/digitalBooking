package com.grupo2.proyectoDigitalBooking.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CityDTO {

    private Long id;

    private String name;

    private String province;

    private String country;
}


