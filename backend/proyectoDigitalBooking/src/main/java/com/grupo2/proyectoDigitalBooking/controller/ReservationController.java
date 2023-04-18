package com.grupo2.proyectoDigitalBooking.controller;

import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
import com.grupo2.proyectoDigitalBooking.handler.ResponseHandler;
import com.grupo2.proyectoDigitalBooking.model.Reservation;
import com.grupo2.proyectoDigitalBooking.service.interfaces.ReservationService;
import com.grupo2.proyectoDigitalBooking.utils.Constants;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(Constants.Endpoints.RESERVATION)
public class ReservationController {

    @Autowired
    ReservationService reservationService;

    @Operation(summary = "Registrar nueva reserva")
    @PostMapping(Constants.Endpoints.CREATE)
    public ResponseEntity<Object> addReservation(@RequestBody Reservation reservation) throws ResourceNotFoundException {
        reservationService.addReservation(reservation);
        return ResponseHandler.generateResponse(Constants.SuccessResponse.RESERVATION_CREATED, HttpStatus.CREATED);
    }

    @Operation(summary = "Eliminar categoría")
    @DeleteMapping(Constants.Endpoints.DELETE)
    public ResponseEntity<Object> deleteReservation(@PathVariable Long id) throws ResourceNotFoundException {

        ResponseEntity<Object> response = null;

        if (reservationService.searchReservation(id) != null) {
            reservationService.cancelReservation(id);
            response = ResponseHandler.generateResponseNoContent(Constants.SuccessResponse.RESERVATION_DELETED);
        } else {
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.RESERVATION_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @Operation(summary = "Buscar reserva por ID")
    @GetMapping(Constants.Endpoints.GET_BY_ID)
    public ResponseEntity<Object> searchReservation(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity<Object> response = null;

        if (id != null && reservationService.searchReservation(id) != null)
            response = response = ResponseEntity.ok(reservationService.searchReservation(id));
        else
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.RESERVATION_NOT_FOUND, HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(summary = "Editar reserva")
    @PutMapping(Constants.Endpoints.UPDATE)
    public ResponseEntity<Object> editReservation(@RequestBody Reservation reservation) throws ResourceNotFoundException {
        ResponseEntity<Object> response = null;

        if (reservation.getId() != null && reservationService.searchReservation(reservation.getId()) != null) {
            reservationService.editReservation(reservation);
            response = ResponseHandler.generateResponse(Constants.SuccessResponse.ENTITY_UPDATED, HttpStatus.OK);
        }else
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.RESERVATION_NOT_FOUND, HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(summary = "Listar todas las reservas")
    @GetMapping(Constants.Endpoints.LIST_ALL)
    public ResponseEntity<Object> listReservations() {
        return ResponseEntity.ok(reservationService.listReservations());
    }
}
