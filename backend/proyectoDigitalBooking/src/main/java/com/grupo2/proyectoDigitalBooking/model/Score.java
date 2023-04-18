package com.grupo2.proyectoDigitalBooking.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
@Table(name = "Score")
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",unique = true)
    private Long id;

    @Max(value = 5, message = "Puntuacion no puede tener un valor mayor a 5")
    private Integer score;

    @OneToMany
    @JoinColumn(name = "score_id")
    private List<User> users;
}
