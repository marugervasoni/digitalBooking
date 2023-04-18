package com.grupo2.proyectoDigitalBooking.repository;

import com.grupo2.proyectoDigitalBooking.model.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IPolicyRepository extends JpaRepository<Policy, Long> {

    Optional<Policy> findByTitle(String title);
    boolean existsByTitle(String title);

}


