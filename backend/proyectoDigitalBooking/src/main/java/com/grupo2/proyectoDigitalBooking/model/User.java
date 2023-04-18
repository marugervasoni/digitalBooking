package com.grupo2.proyectoDigitalBooking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 45)
    private String username;

    @Column(nullable = false, length = 45)
    private String lastname;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String city;

    private Boolean isAccountVerified;

    @ManyToOne()
    @JoinColumn(name = "role_id")
    private RoleUser roleUser;

    /*SCORE
    @OneToMany
    @JoinColumn(name = "user_id")
    private List<Score> scores;
     */
}
