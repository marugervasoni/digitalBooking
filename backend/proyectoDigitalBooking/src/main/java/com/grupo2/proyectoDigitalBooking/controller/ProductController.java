package com.grupo2.proyectoDigitalBooking.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
import com.grupo2.proyectoDigitalBooking.handler.ResponseHandler;
import com.grupo2.proyectoDigitalBooking.model.Product;
import com.grupo2.proyectoDigitalBooking.model.dto.ProductDTO;
import com.grupo2.proyectoDigitalBooking.repository.IProductRepository;
import com.grupo2.proyectoDigitalBooking.service.interfaces.ProductService;
import com.grupo2.proyectoDigitalBooking.utils.Constants;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin (origins = "*")
@RestController
@RequestMapping(Constants.Endpoints.PRODUCTS)
public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private IProductRepository productRepository;
    @Autowired
    ObjectMapper mapper;

    @Operation(summary = "Registrar nuevo producto")
    @PostMapping(Constants.Endpoints.CREATE)
    public ResponseEntity<Object> addProduct(@RequestBody ProductDTO productDTO) {
        productService.addProduct(productDTO);
        return ResponseHandler.generateResponse(Constants.SuccessResponse.ENTITY_CREATED, HttpStatus.CREATED);
    }

    @Operation(summary = "Buscar producto por ID")
    @GetMapping(Constants.Endpoints.GET_BY_ID)
    public ResponseEntity<Object> searchProduct(@PathVariable Long id) {
        ResponseEntity<Object> response = null;

        if (id != null && productService.searchProduct(id) != null)
            response = response = ResponseEntity.ok(productService.searchProduct(id));
        else
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(summary = "Editar producto")
    @PutMapping(Constants.Endpoints.UPDATE)
    public ResponseEntity<Object> editProduct(@RequestBody ProductDTO productDTO) {
        ResponseEntity<Object> response = null;

        if (productDTO.getId() != null && productService.searchProduct(productDTO.getId()) != null) {
            productService.editProduct(productDTO);
            response = ResponseHandler.generateResponse(Constants.SuccessResponse.ENTITY_UPDATED, HttpStatus.OK);
        } else
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
        return response;
    }

    @Operation(summary = "Eliminar producto")
    @DeleteMapping(Constants.Endpoints.DELETE)
    public ResponseEntity<Object> deleteProduct(@PathVariable Long id) {
        ResponseEntity<Object> response = null;

        if (productService.searchProduct(id) != null) {
            try {
                productService.deleteProduct(id);
            } catch (com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException e) {
                e.printStackTrace();
            }
            response = ResponseHandler.generateResponseNoContent(Constants.SuccessResponse.ENTITY_DELETED);
        } else {
            response = ResponseHandler.generateResponse(Constants.ErrorResponse.ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return response;
    }

    @Operation(summary = "Listar todos los productos")
    @GetMapping(Constants.Endpoints.LIST_ALL)
    public ResponseEntity<Object> listProducts() {
        return ResponseEntity.ok(productService.listProducts());
    }

    @Operation(summary = "Listar productos aleatoriamente")
    @GetMapping(Constants.Endpoints.RANDOM)
    public ResponseEntity<Object> randomProducts() {
         return ResponseEntity.ok(productService.getRandomProducts());
    }

    @Operation(summary = "Busca productos por ciudad")
    @GetMapping(Constants.Endpoints.GET_PRODUCTS_BY_CITY)
    public List<ProductDTO> searchByCity(@PathVariable String name) {
        List<Product> products = productRepository.findByCityName(name);
        List<ProductDTO> productsDTO = products.stream()
                .map(product -> mapper.convertValue(product, ProductDTO.class))
                .collect(Collectors.toList());
        return productsDTO;
    }

    @Operation(summary = "Busca productos por categoria")
    @GetMapping(Constants.Endpoints.GET_PRODUCTS_BY_CATEGORY)
    public List<ProductDTO> searchByCategory(@PathVariable String title) {
        List<Product> products = productRepository.findByCategoryTitle(title);
        List<ProductDTO> productsDTO = products.stream()
                .map(product -> mapper.convertValue(product, ProductDTO.class))
                .collect(Collectors.toList());
        return productsDTO;
    }

    @Operation(summary = "Buscar productos por ciudad y fechas disponibles")
    @GetMapping(Constants.Endpoints.GET_PRODUCTS_BY_CITY_DATE)
    public ResponseEntity<?> searchByCityAndDate(@RequestParam String city, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date initialDate, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date finalDate) {
        try {
            List<Product> products = productService.searchByCityAndDate(city, initialDate, finalDate);
            return ResponseEntity.ok(products);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
