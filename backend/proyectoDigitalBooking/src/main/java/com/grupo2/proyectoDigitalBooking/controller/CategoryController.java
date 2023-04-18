package com.grupo2.proyectoDigitalBooking.controller;

import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
import com.grupo2.proyectoDigitalBooking.handler.ResponseHandler;
import com.grupo2.proyectoDigitalBooking.model.dto.CategoryDTO;
import com.grupo2.proyectoDigitalBooking.service.interfaces.CategoryService;
import com.grupo2.proyectoDigitalBooking.utils.Constants;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin (origins = "*")
@RestController
@RequestMapping(Constants.Endpoints.CATEGORIES)
public class CategoryController {

        @Autowired
        private CategoryService categoryService;

        @Operation(summary = "Registrar nueva categoría")
        @PostMapping(Constants.Endpoints.CREATE)
        public ResponseEntity<Object> addCategory(@RequestBody CategoryDTO categoryDTO) {
            categoryService.addCategory(categoryDTO);
            return ResponseHandler.generateResponse(Constants.SuccessResponse.ENTITY_CREATED,HttpStatus.CREATED);
        }

        @Operation(summary = "Eliminar categoría")
        @DeleteMapping(Constants.Endpoints.DELETE)
        public ResponseEntity<Object> deleteCategory(@PathVariable Long id) throws ResourceNotFoundException {

            ResponseEntity<Object> response = null;

            if (categoryService.searchCategory(id) != null) {
                categoryService.deleteCategory(id);
                response = ResponseHandler.generateResponseNoContent(Constants.SuccessResponse.ENTITY_DELETED);
            } else {
                response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
            }
            return response;
        }

        @Operation(summary = "Buscar categoría por ID")
        @GetMapping(Constants.Endpoints.GET_BY_ID)
        public ResponseEntity<Object> searchCategory(@PathVariable Long id) {
            ResponseEntity<Object> response = null;

            if (id != null && categoryService.searchCategory(id) != null)
                response = ResponseEntity.ok(categoryService.searchCategory(id));
            else
                response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
            return response;
        }


        @Operation(summary = "Editar categoría")
        @PutMapping(Constants.Endpoints.UPDATE)
        public ResponseEntity<Object> editCategory(@RequestBody CategoryDTO categoryDTO) {
            ResponseEntity<Object> response = null;

            if (categoryDTO.getId() != null && categoryService.searchCategory(categoryDTO.getId()) != null) {
                categoryService.editCategory(categoryDTO);
                response = ResponseHandler.generateResponse(Constants.SuccessResponse.ENTITY_UPDATED, HttpStatus.OK);
            }else
                response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
            return response;
        }

        @Operation(summary = "Listar todas las categorías")
        @GetMapping(Constants.Endpoints.LIST_ALL)
        public ResponseEntity<Object> listCategories() {
            return ResponseEntity.ok(categoryService.listCategories());
        }
}
