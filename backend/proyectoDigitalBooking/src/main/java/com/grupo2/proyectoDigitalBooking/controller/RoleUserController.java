package com.grupo2.proyectoDigitalBooking.controller;

import com.grupo2.proyectoDigitalBooking.handler.ResponseHandler;
import com.grupo2.proyectoDigitalBooking.model.dto.RoleUserDTO;
import com.grupo2.proyectoDigitalBooking.service.interfaces.RoleUserService;
import com.grupo2.proyectoDigitalBooking.utils.Constants;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin (origins = "*")
@RestController
@RequestMapping(Constants.Endpoints.ROLES)
public class RoleUserController {

    @Autowired
    private RoleUserService roleUserService;

    @Operation(summary = "Registrar nuevo rol")
    @PostMapping(Constants.Endpoints.CREATE)
    public ResponseEntity<Object> addRole(@RequestBody RoleUserDTO roleUserDTO) {
        roleUserService.addRole(roleUserDTO);
        return ResponseHandler.generateResponse(Constants.SuccessResponse.ROLE_CREATED, HttpStatus.CREATED);
    }

    @Operation(summary = "Eliminar rol")
    @DeleteMapping(Constants.Endpoints.DELETE)
    public ResponseEntity<Object> deleteRole(@PathVariable Long id){

        ResponseEntity<Object> response = null;

        if (roleUserService.searchRole(id) != null) {
            try {
                roleUserService.deleteRole(id);
            } catch (com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException e) {
                e.printStackTrace();
            }
            response = ResponseHandler.generateResponseNoContent(Constants.SuccessResponse.ENTITY_DELETED);
        } else {
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @Operation(summary = "Buscar rol por ID")
    @GetMapping(Constants.Endpoints.GET_BY_ID)
    public ResponseEntity<Object> searchRole(@PathVariable Long id) {
        ResponseEntity<Object> response = null;

        if (id != null && roleUserService.searchRole(id) != null)
            response = response = ResponseEntity.ok(roleUserService.searchRole(id));
        else
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(summary = "Editar rol")
    @PutMapping(Constants.Endpoints.UPDATE)
    public ResponseEntity<Object> editRole(@RequestBody RoleUserDTO roleUserDTO) {
        ResponseEntity<Object> response = null;

        if (roleUserDTO.getId() != null && roleUserService.searchRole(roleUserDTO.getId()) != null) {
            roleUserService.editRole(roleUserDTO);
            response = ResponseHandler.generateResponse(Constants.SuccessResponse.ENTITY_UPDATED, HttpStatus.OK);
        }else
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(summary = "Listar todos los roles")
    @GetMapping(Constants.Endpoints.LIST_ALL)
    public ResponseEntity<Object> listRoles() {
        return ResponseEntity.ok(roleUserService.listRoles());
    }
}
