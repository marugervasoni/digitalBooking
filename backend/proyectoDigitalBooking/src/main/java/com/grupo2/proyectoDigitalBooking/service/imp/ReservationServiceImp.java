package com.grupo2.proyectoDigitalBooking.service.imp;

import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
import com.grupo2.proyectoDigitalBooking.model.Product;
import com.grupo2.proyectoDigitalBooking.model.Reservation;
import com.grupo2.proyectoDigitalBooking.model.User;
import com.grupo2.proyectoDigitalBooking.repository.IProductRepository;
import com.grupo2.proyectoDigitalBooking.repository.IReservationRepository;
import com.grupo2.proyectoDigitalBooking.repository.IUserRepository;
import com.grupo2.proyectoDigitalBooking.service.interfaces.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class ReservationServiceImp implements ReservationService {

    @Autowired
    private IReservationRepository reservationRepository;
    @Autowired
    private IProductRepository productRepository;
    @Autowired
    private IUserRepository userRepository;

    @Override
    public Reservation addReservation(Reservation reservation) throws ResourceNotFoundException {
        Product product = productRepository.findById(reservation.getProduct().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));
        User user = userRepository.findById(reservation.getUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        reservation.setProduct(product);
        reservation.setUser(user);

        Reservation reservationCreated = reservationRepository.save(reservation);

        product.setReservationId(reservationCreated.getId());
        productRepository.save(product);

        return reservationCreated;
    }

    @Override
    public Reservation searchReservation(Long id) throws ResourceNotFoundException{
        return reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reserva no encontrada"));
    }

    @Override
    public void editReservation(Reservation reservation) throws ResourceNotFoundException{
        Reservation existingReservation = reservationRepository.findById(reservation.getId())
                .orElseThrow(()-> new ResourceNotFoundException("Reserva con id "+ reservation.getId()+" no encontrada"));

        existingReservation.setStartTime(reservation.getStartTime());
        existingReservation.setInitialDate(reservation.getInitialDate());
        existingReservation.setFinalDate(reservation.getFinalDate());

        Product product = productRepository.findById(reservation.getProduct().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Producto con id "+ reservation.getProduct().getId()+" no encontrado"));
        existingReservation.setProduct(product);

        User user = userRepository.findById(reservation.getUser().getId())
                .orElseThrow(()-> new ResourceNotFoundException("Usuario con id "+ reservation.getUser().getId()+" no encontrado"));
        existingReservation.setUser(user);

        reservationRepository.save(existingReservation);
    }

    @Override
    public void cancelReservation(Long id) throws ResourceNotFoundException {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Reserva no encontrada"));
        reservationRepository.delete(reservation);
    }

    @Override
    public Set<Reservation> listReservations() {
        return new HashSet<>(reservationRepository.findAll());
    }
}


