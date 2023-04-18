package com.grupo2.proyectoDigitalBooking.controller;

import com.grupo2.proyectoDigitalBooking.handler.ResponseHandler;
import com.grupo2.proyectoDigitalBooking.model.dto.ScoreDTO;
import com.grupo2.proyectoDigitalBooking.service.interfaces.ScoreService;
import com.grupo2.proyectoDigitalBooking.utils.Constants;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin (origins = "*")
@RestController
@RequestMapping(Constants.Endpoints.SCORES)
public class ScoreController {

    @Autowired
    private ScoreService scoreService;

    @Operation(summary = "Registrar nueva puntuacion")
    @PostMapping(Constants.Endpoints.CREATE)
    public ResponseEntity<Object> addScore(@RequestBody ScoreDTO scoreDTO) {
        scoreService.addScore(scoreDTO);
        return ResponseHandler.generateResponse(Constants.SuccessResponse.ENTITY_CREATED, HttpStatus.CREATED);
    }

    @Operation(summary = "Buscar puntuacion por ID")
    @GetMapping(Constants.Endpoints.GET_BY_ID)
    public ResponseEntity<Object> searchScore(@PathVariable Long id) {
        ResponseEntity<Object> response = null;

        if (id != null && scoreService.searchScore(id) != null)
            response = response = ResponseEntity.ok(scoreService.searchScore(id));
        else
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(summary = "Editar puntuacion")
    @PutMapping(Constants.Endpoints.UPDATE)
    public ResponseEntity<Object> editScore(@RequestBody ScoreDTO scoreDTO) {
        ResponseEntity<Object> response = null;

        if (scoreDTO.getId() != null && scoreService.searchScore(scoreDTO.getId()) != null){
            scoreService.editScore(scoreDTO);
            response = ResponseHandler.generateResponse(Constants.SuccessResponse.ENTITY_UPDATED, HttpStatus.OK);
        }else
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(summary = "Eliminar puntuacion")
    @DeleteMapping(Constants.Endpoints.DELETE)
    public ResponseEntity<Object> deleteScore(@PathVariable Long id){

        ResponseEntity<Object> response = null;

        if (scoreService.searchScore(id) != null) {
            try {
                scoreService.deleteScore(id);
            } catch (com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException e) {
                e.printStackTrace();
            }
            response = ResponseHandler.generateResponseNoContent(Constants.SuccessResponse.ENTITY_DELETED);
        } else {
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @Operation(summary = "Listar todas las puntuaciones")
    @GetMapping(Constants.Endpoints.LIST_ALL)
    public ResponseEntity<Object> listScores() {
        return ResponseEntity.ok(scoreService.listScores());
    }
}
