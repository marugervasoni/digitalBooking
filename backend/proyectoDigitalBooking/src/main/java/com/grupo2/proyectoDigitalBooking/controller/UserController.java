package com.grupo2.proyectoDigitalBooking.controller;

import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
import com.grupo2.proyectoDigitalBooking.handler.ResponseHandler;
import com.grupo2.proyectoDigitalBooking.model.dto.UserDTO;
import com.grupo2.proyectoDigitalBooking.service.interfaces.UserService;
import com.grupo2.proyectoDigitalBooking.utils.Constants;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin (origins = "*")
@RestController
@RequestMapping(Constants.Endpoints.USERS)
public class UserController {

    @Autowired
    private UserService userService;

    @Operation(summary = "Registrar nuevo usuario")
    @PostMapping(Constants.Endpoints.CREATE)
    public ResponseEntity<Object> addUser(@RequestBody UserDTO userDTO) {
        userService.addUser(userDTO);
        return ResponseHandler.generateResponse(Constants.SuccessResponse.USER_CREATED, HttpStatus.CREATED);
    }

    @Operation(summary = "Buscar usuario por ID")
    @GetMapping(Constants.Endpoints.GET_BY_ID)
    public ResponseEntity<Object> searchUser(@PathVariable Integer id) {
        ResponseEntity<Object> response = null;

        if (id != null && userService.searchUser(id) != null)
            response = response = ResponseEntity.ok(userService.searchUser(id));
        else
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(summary = "Editar usuario")
    @PutMapping(Constants.Endpoints.UPDATE)
    public ResponseEntity<Object> editUser(@RequestBody UserDTO userDTO) {
        ResponseEntity<Object> response = null;

        if (userDTO.getId() != null && userService.searchUser(userDTO.getId()) != null) {
            userService.editUser(userDTO);
            response = ResponseHandler.generateResponse(Constants.SuccessResponse.ENTITY_UPDATED, HttpStatus.OK);
        }
        else
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(summary = "Eliminar usuario")
    @DeleteMapping(Constants.Endpoints.DELETE)
    public ResponseEntity<Object> deleteUser(@PathVariable Integer id) throws ResourceNotFoundException {

        ResponseEntity<Object> response = null;

        if (userService.searchUser(id) != null) {
            userService.deleteUser(id);
            response = ResponseHandler.generateResponseNoContent(Constants.SuccessResponse.ENTITY_DELETED);
        } else {
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @Operation(summary = "Listar todos los usuarios")
    @GetMapping(Constants.Endpoints.LIST_ALL)
    public ResponseEntity<Object> listUsers() {
        return ResponseEntity.ok(userService.listUsers());
    }
}
