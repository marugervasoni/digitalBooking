package com.grupo2.proyectoDigitalBooking.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "feature")
public class Feature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",unique = true)
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "Caracteristica debe tener un nombre")
    @Size(max = 255, message = "Nombre de la característica no debe tener más de 255 caracteres")
    private String name;

    @Column(nullable = false)
    @NotBlank(message = "Caracteristica debe tener un icono")
    private String icon;
}
