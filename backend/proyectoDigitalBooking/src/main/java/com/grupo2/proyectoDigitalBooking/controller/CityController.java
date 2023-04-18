package com.grupo2.proyectoDigitalBooking.controller;

import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
import com.grupo2.proyectoDigitalBooking.handler.ResponseHandler;
import com.grupo2.proyectoDigitalBooking.model.dto.CityDTO;
import com.grupo2.proyectoDigitalBooking.service.interfaces.CityService;
import com.grupo2.proyectoDigitalBooking.utils.Constants;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin (origins = "*")
@RestController
@RequestMapping(Constants.Endpoints.CITIES)
public class CityController {

    @Autowired
    private CityService cityService;

    @Operation(summary = "Registrar nueva ciudad")
    @PostMapping(Constants.Endpoints.CREATE)
    public ResponseEntity<Object> addCity(@RequestBody CityDTO cityDTO) {
        cityService.addCity(cityDTO);
        return ResponseHandler.generateResponse(Constants.SuccessResponse.ENTITY_CREATED,HttpStatus.CREATED);
    }

    @Operation(summary = "Buscar ciudad por ID")
    @GetMapping(Constants.Endpoints.GET_BY_ID)
    public ResponseEntity<Object> searchCity(@PathVariable Long id) {
        ResponseEntity<Object> response = null;

        if (id != null && cityService.searchCity(id) != null)
            response = response = ResponseEntity.ok(cityService.searchCity(id));
        else
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(summary = "Editar ciudad")
    @PutMapping(Constants.Endpoints.UPDATE)
    public ResponseEntity<Object> editCity(@RequestBody CityDTO cityDTO) {
        ResponseEntity<Object> response = null;

        if (cityDTO.getId() != null && cityService.searchCity(cityDTO.getId()) != null) {
            cityService.editCity(cityDTO);
            response = ResponseHandler.generateResponse(Constants.SuccessResponse.ENTITY_UPDATED, HttpStatus.OK);
        }else
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(summary = "Eliminar ciudad")
    @DeleteMapping(Constants.Endpoints.DELETE)
    public ResponseEntity<Object> deleteCity(@PathVariable Long id) throws ResourceNotFoundException {

        ResponseEntity<Object> response = null;

        if (cityService.searchCity(id) != null) {
            cityService.deleteCity(id);
            response = ResponseHandler.generateResponseNoContent(Constants.SuccessResponse.ENTITY_DELETED);
        } else {
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @Operation(summary = "Listar todas las ciudades")
    @GetMapping(Constants.Endpoints.LIST_ALL)
    public ResponseEntity<Object> listCities() {
        return ResponseEntity.ok(cityService.listCities());
    }
}
