package com.grupo2.proyectoDigitalBooking.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "city")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",unique = true)
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "Ciudad debe tener un nombre")
    @Size(max = 255, message = "Nombre de la ciudad no debe tener más de 255 caracteres")
    private String name;

    @NotBlank(message = "Ciudad debe tener una provincia")
    @Size(max = 255, message = "provincia de la ciudad no debe tener más de 255 caracteres")
    private String province;

    @NotBlank(message = "Ciudad debe tener un Pais")
    @Size(max = 255, message = "Pais de la ciudad no debe tener más de 255 caracteres")
    private String country;
}
