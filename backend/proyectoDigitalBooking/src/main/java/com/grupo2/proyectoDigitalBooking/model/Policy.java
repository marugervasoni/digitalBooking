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
@Table(name = "policy")
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",unique = true)
    private Long id;

    @Column(nullable = false, length = 45)
    @Size(max = 45, message = "Titulo de la política no debe tener más de 45 caracteres")
    @NotBlank(message = "Política debe tener un titulo")
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT", length = 600)
    @Size(max = 600, message = "Descripcion de la política no debe tener más de 600 caracteres")
    @NotBlank(message = "Política debe tener una descrpción")
    private String description;
}
