package com.grupo2.proyectoDigitalBooking.controller;

import com.grupo2.proyectoDigitalBooking.handler.ResponseHandler;
import com.grupo2.proyectoDigitalBooking.model.dto.PolicyDTO;
import com.grupo2.proyectoDigitalBooking.service.interfaces.PolicyService;
import com.grupo2.proyectoDigitalBooking.utils.Constants;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin (origins = "*")
@RestController
@RequestMapping(Constants.Endpoints.POLICIES)
public class PolicyController {

    @Autowired
    private PolicyService policyService;

    @Operation(summary = "Registrar nueva politica")
    @PostMapping(Constants.Endpoints.CREATE)
    public ResponseEntity<Object> addPolicy(@RequestBody PolicyDTO policyDTO) {
        policyService.addPolicy(policyDTO);
        return ResponseHandler.generateResponse(Constants.SuccessResponse.ENTITY_CREATED,HttpStatus.CREATED);
    }

    @Operation(summary = "Eliminar politica")
    @DeleteMapping(Constants.Endpoints.DELETE)
    public ResponseEntity<Object> deletePolicy(@PathVariable Long id){

        ResponseEntity<Object> response = null;

        if (policyService.searchPolicy(id) != null) {
            try {
                policyService.deletePolicy(id);
            } catch (com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException e) {
                e.printStackTrace();
            }
            response = ResponseHandler.generateResponseNoContent(Constants.SuccessResponse.ENTITY_DELETED);
        } else {
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @Operation(summary = "Buscar politicas por ID")
    @GetMapping(Constants.Endpoints.GET_BY_ID)
    public ResponseEntity<Object> searchPolicy(@PathVariable Long id) {
        ResponseEntity<Object> response = null;

        if (id != null && policyService.searchPolicy(id) != null)
            response = response = ResponseEntity.ok(policyService.searchPolicy(id));
        else
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(summary = "Editar politica")
    @PutMapping(Constants.Endpoints.UPDATE)
    public ResponseEntity<Object> editPolicy(@RequestBody PolicyDTO policyDTO) {
        ResponseEntity<Object> response = null;

        if (policyDTO.getId() != null && policyService.searchPolicy(policyDTO.getId()) != null) {
            policyService.editPolicy(policyDTO);
            response = ResponseHandler.generateResponse(Constants.SuccessResponse.ENTITY_UPDATED, HttpStatus.OK);
        }else
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(summary = "Listar todas las politicas")
    @GetMapping(Constants.Endpoints.LIST_ALL)
    public ResponseEntity<Object> listPolicies() {
        return ResponseEntity.ok(policyService.listPolicies());
    }

}
