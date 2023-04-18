package com.grupo2.proyectoDigitalBooking.repository;

import com.grupo2.proyectoDigitalBooking.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ICityRepository extends JpaRepository<City, Long> {

    Optional<City> findByName(String name);
    boolean existsByName(String name);
}
