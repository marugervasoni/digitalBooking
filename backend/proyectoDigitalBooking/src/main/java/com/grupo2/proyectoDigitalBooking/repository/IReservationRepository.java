package com.grupo2.proyectoDigitalBooking.repository;

import com.grupo2.proyectoDigitalBooking.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

//@Repository
public interface IReservationRepository extends JpaRepository<Reservation, Long> {

}


