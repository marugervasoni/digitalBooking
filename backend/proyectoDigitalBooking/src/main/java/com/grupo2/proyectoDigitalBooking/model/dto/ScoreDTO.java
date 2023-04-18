package com.grupo2.proyectoDigitalBooking.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScoreDTO {

    private Long id;

    private Integer score;

    private List<UserDTO> users;
}
