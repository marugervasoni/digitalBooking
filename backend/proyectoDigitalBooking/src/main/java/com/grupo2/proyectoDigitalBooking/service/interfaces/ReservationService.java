package com.grupo2.proyectoDigitalBooking.service.interfaces;

import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
import com.grupo2.proyectoDigitalBooking.model.Reservation;

import java.util.Set;

public interface ReservationService {

    Reservation addReservation (Reservation reservation) throws ResourceNotFoundException;

    Reservation searchReservation(Long id) throws ResourceNotFoundException;

    void editReservation(Reservation reservation) throws ResourceNotFoundException;

    void cancelReservation (Long id) throws ResourceNotFoundException;

    Set<Reservation> listReservations();

}


