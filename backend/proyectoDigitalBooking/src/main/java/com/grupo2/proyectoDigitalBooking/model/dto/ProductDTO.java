package com.grupo2.proyectoDigitalBooking.model.dto;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import java.sql.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {

    private Long id;

    private String name;

    private String address;

    private String description;

    private Boolean availability;

    private String latitude;

    private String longitude;

    private CategoryDTO category;

    private CityDTO city;

    private List<ImageDTO> images;

    private List <PolicyDTO> policies;

    private List <FeatureDTO> features;

    private List<ScoreDTO> scores;

    @ElementCollection
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private List<Date> availableDates;

    private List<ReservationDTO> reservations;
}
