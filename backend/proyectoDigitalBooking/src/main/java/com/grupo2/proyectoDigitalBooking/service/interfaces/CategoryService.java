package com.grupo2.proyectoDigitalBooking.service.interfaces;

import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
import com.grupo2.proyectoDigitalBooking.model.Category;
import com.grupo2.proyectoDigitalBooking.model.dto.CategoryDTO;
import java.util.Set;

public interface CategoryService {

    Category addCategory(CategoryDTO categoryDTO);

    CategoryDTO searchCategory(Long id);

    void editCategory(CategoryDTO categoryDTO);

    void deleteCategory (Long id) throws ResourceNotFoundException;

    Set<CategoryDTO> listCategories();
}
