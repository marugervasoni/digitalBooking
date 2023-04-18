package com.grupo2.proyectoDigitalBooking.exceptions;

public class NotFoundException extends RuntimeException {

    public NotFoundException(Long idProduct) {
        super("The product with id = "+idProduct+" has not been found.");
    }
}
