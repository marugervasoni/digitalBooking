package com.grupo2.proyectoDigitalBooking.service.imp;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
import com.grupo2.proyectoDigitalBooking.model.Category;
import com.grupo2.proyectoDigitalBooking.model.dto.CategoryDTO;
import com.grupo2.proyectoDigitalBooking.repository.ICategoryRepository;
import com.grupo2.proyectoDigitalBooking.service.interfaces.CategoryService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CategoryServiceImp implements CategoryService {

    @Autowired
    private ICategoryRepository categoryRepository;

    @Autowired
    ObjectMapper mapper;

    private static final Logger logger = Logger.getLogger(CategoryServiceImp.class);

    @Override
    public Category addCategory(CategoryDTO categoryDTO) {
        Category category = null;

        if(categoryDTO.getId() != null) {
            category = categoryRepository.findById(categoryDTO.getId()).orElse(null);
        }
        if(category == null) {
            category = mapper.convertValue(categoryDTO,Category.class);
            logger.info("Se creó la categoría: "+categoryDTO.getTitle());
            category = categoryRepository.save(category);
        }
        return category;
    }

    @Override
    public CategoryDTO searchCategory(Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        CategoryDTO categoryDTO = null;
        if(category.isPresent())
            categoryDTO = mapper.convertValue(category,CategoryDTO.class);
        logger.info("Se encontró la categoría: "+categoryDTO.getTitle());

        return categoryDTO;
    }

    @Override
    public void editCategory(CategoryDTO categoryDTO) {
        Category category = mapper.convertValue(categoryDTO,Category.class);
        categoryRepository.save(category);
        logger.info("Se actualizó la categoría: "+categoryDTO.getId());
    }

    @Override
    public void deleteCategory(Long id) throws ResourceNotFoundException{
        if (searchCategory(id) == null)
            throw new ResourceNotFoundException("No existe categoría con id "+id);
        logger.info("Se eliminó la categoría: "+id);
        categoryRepository.deleteById(id);
    }

    @Override
    public Set<CategoryDTO> listCategories() {
        List<Category> categories = categoryRepository.findAll();
        Set<CategoryDTO> categoriesDTO = new HashSet<>();

        for (Category category:categories) {
            categoriesDTO.add(mapper.convertValue(category, CategoryDTO.class));
        }
        logger.info("Se listan todas la categorías.");
        return  categoriesDTO;
    }
}

