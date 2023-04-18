package com.grupo2.proyectoDigitalBooking.repository;

import com.grupo2.proyectoDigitalBooking.model.Feature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IFeatureRepository extends JpaRepository<Feature, Long> {

    Optional<Feature> findByName(String name);
    boolean existsByName(String name);
}



