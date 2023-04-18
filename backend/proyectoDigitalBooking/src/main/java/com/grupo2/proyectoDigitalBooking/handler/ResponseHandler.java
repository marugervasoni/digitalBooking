package com.grupo2.proyectoDigitalBooking.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;

public class ResponseHandler {


    public static ResponseEntity<Object> generateResponse(String message, HttpStatus status) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", message);

        return new ResponseEntity<Object>(map,status);
    }

    public static ResponseEntity<Object> generateResponseNoContent(String message) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", message);

        return new ResponseEntity<Object>(map,HttpStatus.NO_CONTENT);
    }
}


