package com.grupo2.proyectoDigitalBooking.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "Image")
@JsonIgnoreProperties(value = "product")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",unique = true)
    private Long id;

    @Column(nullable = false, length = 50)
    @Size(max = 50, message = "Titulo de la imagen no debe tener más de 50 caracteres")
    @NotBlank(message = "Imagen debe tener un titulo")
    private String title;

    @Column(nullable = false)
    @NotBlank(message = "Imagen debe tener una url")
    private String url;
}
