package com.grupo2.proyectoDigitalBooking.controller;

import com.grupo2.proyectoDigitalBooking.handler.ResponseHandler;
import com.grupo2.proyectoDigitalBooking.model.dto.ImageDTO;
import com.grupo2.proyectoDigitalBooking.service.interfaces.ImageService;
import com.grupo2.proyectoDigitalBooking.utils.Constants;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin (origins = "*")
@RestController
@RequestMapping(Constants.Endpoints.IMAGES)
public class ImageController {

    @Autowired
    private ImageService imageService;

    @Operation(summary = "Registrar nueva imagen")
    @PostMapping(Constants.Endpoints.CREATE)
    public ResponseEntity<Object> addImage(@RequestBody ImageDTO imageDTO) {
        imageService.addImage(imageDTO);
        return ResponseHandler.generateResponse(Constants.SuccessResponse.ENTITY_CREATED,HttpStatus.CREATED);
    }

    @Operation(summary = "Eliminar imagen")
    @DeleteMapping(Constants.Endpoints.DELETE)
    public ResponseEntity<Object> deleteImage(@PathVariable Long id){

        ResponseEntity<Object> response = null;

        if (imageService.searchImage(id) != null) {
            try {
                imageService.deleteImage(id);
            } catch (com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException e) {
                e.printStackTrace();
            }
            response = ResponseHandler.generateResponseNoContent(Constants.SuccessResponse.ENTITY_DELETED);
        } else {
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @Operation(summary = "Buscar imagen por ID")
    @GetMapping(Constants.Endpoints.GET_BY_ID)
    public ResponseEntity<Object> searchImage(@PathVariable Long id) {
        ResponseEntity<Object> response = null;

        if (id != null && imageService.searchImage(id) != null)
            response = response = ResponseEntity.ok(imageService.searchImage(id));
        else
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(summary = "Editar imagen")
    @PutMapping(Constants.Endpoints.UPDATE)
    public ResponseEntity<Object> editImage(@RequestBody ImageDTO imageDTO) {
        ResponseEntity<Object> response = null;

        if (imageDTO.getId() != null && imageService.searchImage(imageDTO.getId()) != null) {
            imageService.editImage(imageDTO);
            response = ResponseHandler.generateResponse(Constants.SuccessResponse.ENTITY_UPDATED, HttpStatus.OK);
        }else
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(summary = "Listar todas las imagenes")
    @GetMapping(Constants.Endpoints.LIST_ALL)
    public ResponseEntity<Object> listImages() {
        return ResponseEntity.ok(imageService.listImages());
    }

}
