package com.grupo2.proyectoDigitalBooking.model.dto;

import com.grupo2.proyectoDigitalBooking.model.RoleUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private Integer id;

    private String username;

    private String lastname;

    private String email;

    private String password;

    private String city;

    private Boolean isAccountVerified;

    private RoleUser roleUser;
}
