package com.grupo2.proyectoDigitalBooking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @Column(nullable = false, length = 45)
    @NotBlank(message = "Producto debe tener un nombre")
    @Size(max = 45, message = "El nombre no debe tener más de 45 caracteres")
    private String name;

    @Column(nullable = false)
    @NotBlank(message = "Producto debe tener una direccion")
    @Size(max = 255, message = "Direccion no debe tener más de 255 caracteres")
    private String address;

    @Column(columnDefinition = "TEXT", length = 1200)
    @Size(max = 1200, message = "Descripcion no debe tener más de 1200 caracteres")
    private String description;

    private Boolean availability;

    @Column(nullable = false)
    @NotBlank(message = "Producto debe tener una latitud")
    private String latitude;

    @Column(nullable = false)
    @NotBlank(message = "Producto debe tener una longitud")
    private String longitude;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    @OneToMany
    @JoinColumn(name = "product_id")
    private List<Image> images;

    /*@OneToMany
    @JoinColumn(name = "product_id")
    private List<Policy> policies;
     */
    //cambie relacion a many to many
    @ManyToMany
    @JoinTable(
            name = "products_policies",
            joinColumns = @JoinColumn(
                    name = "product_id",
                    foreignKey = @ForeignKey(name = "product_policy_id")
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "policy_id",
                    foreignKey = @ForeignKey(name = "policy_product_id")
            )
    )
    private List<Policy> policies;

    @ManyToMany
    @JoinTable(
            name = "products_features",
            joinColumns = @JoinColumn(
                    name = "product_id",
                    foreignKey = @ForeignKey(name = "product_feature_id")
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "feature_id",
                    foreignKey = @ForeignKey(name = "feature_product_id")
            )
    )
    private List<Feature> features;

    @OneToMany
    @JoinColumn(name = "product_id")
    private List<Score> scores;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Reservation> reservations;

    @Column(name="reservation_id")
    private Long reservationId;

    /*@ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
     */
}









