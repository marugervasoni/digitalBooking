package com.grupo2.proyectoDigitalBooking.controller;

import com.grupo2.proyectoDigitalBooking.handler.ResponseHandler;;
import com.grupo2.proyectoDigitalBooking.model.dto.FeatureDTO;
import com.grupo2.proyectoDigitalBooking.service.interfaces.FeatureService;
import com.grupo2.proyectoDigitalBooking.utils.Constants;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin (origins = "*")
@RestController
@RequestMapping(Constants.Endpoints.FEATURES)
public class FeatureController {

    @Autowired
    private FeatureService featureService;

    @Operation(summary = "Registrar nueva caracteristica")
    @PostMapping(Constants.Endpoints.CREATE)
    public ResponseEntity<Object> addFeature(@RequestBody FeatureDTO featureDTO) {
        featureService.addFeature(featureDTO);
        return ResponseHandler.generateResponse(Constants.SuccessResponse.ENTITY_CREATED,HttpStatus.CREATED);
    }

    @Operation(summary = "Buscar caracteristica por ID")
    @GetMapping(Constants.Endpoints.GET_BY_ID)
    public ResponseEntity<Object> searchFeature(@PathVariable Long id) {
        ResponseEntity<Object> response = null;

        if (id != null && featureService.searchFeature(id) != null)
            response = response = ResponseEntity.ok(featureService.searchFeature(id));
        else
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(summary = "Editar caracateristica")
    @PutMapping(Constants.Endpoints.UPDATE)
    public ResponseEntity<Object> editFeature(@RequestBody FeatureDTO featureDTO) {
        ResponseEntity<Object> response = null;

        if (featureDTO.getId() != null && featureService.searchFeature(featureDTO.getId()) != null) {
            featureService.editFeature(featureDTO);
            response = ResponseHandler.generateResponse(Constants.SuccessResponse.ENTITY_UPDATED, HttpStatus.OK);
        }else
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(summary = "Eliminar caracateristica")
    @DeleteMapping(Constants.Endpoints.DELETE)
    public ResponseEntity<Object> deleteFeature(@PathVariable Long id){

        ResponseEntity<Object> response = null;

        if (featureService.searchFeature(id) != null) {
            try {
                featureService.deleteFeature(id);
            } catch (com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException e) {
                e.printStackTrace();
            }
            response = ResponseHandler.generateResponseNoContent(Constants.SuccessResponse.ENTITY_DELETED);
        } else {
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @Operation(summary = "Listar todas las caracteristicas")
    @GetMapping(Constants.Endpoints.LIST_ALL)
    public ResponseEntity<Object> listFeatures() {
        return ResponseEntity.ok(featureService.listFeatures());
    }
}
