package com.grupo2.proyectoDigitalBooking.service;

import com.grupo2.proyectoDigitalBooking.model.dto.CategoryDTO;
import com.grupo2.proyectoDigitalBooking.service.interfaces.CategoryService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CategoriaServiceTest {

    @Autowired
    private CategoryService categoryService;

    @Test
    public void testAddCategory(){
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setTitle("Hoteles");
        categoryDTO.setDescription("Un hotel es tu alojamiento ideal");
        categoryDTO.setImage("https://grupo2-digitalbooking-img.s3.us-east-2.amazonaws.com/Hotel1/0-h-VillaCPaz.jpg");

        CategoryDTO categoryHoteles = categoryService.searchCategory(1L);

        assertTrue(categoryHoteles != null);
    }
}

