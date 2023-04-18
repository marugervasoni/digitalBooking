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
@Table(name = "category")
public class Category{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(nullable = false, length = 45)
    @NotBlank(message = "categoría debe tener titulo")
    @Size(max = 45, message = "Titulo no puede exceder de los 45 carácteres")
    private String title;

    @Column(nullable = false, length = 255)
    @NotBlank(message = "categoría debe tener descripcion")
    @Size(max = 255, message = "Descripcion no puede exceder de los 255 carácteres")
    private String description;

    @Column(name= "image_url", nullable = false)
    @NotBlank(message = "categoría debe tener imagen")
    private String image;
}

