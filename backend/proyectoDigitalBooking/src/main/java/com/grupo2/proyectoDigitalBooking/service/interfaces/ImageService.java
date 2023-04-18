package com.grupo2.proyectoDigitalBooking.service.interfaces;

import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
import com.grupo2.proyectoDigitalBooking.model.Image;
import com.grupo2.proyectoDigitalBooking.model.dto.ImageDTO;

import java.util.Set;

public interface ImageService {

    ImageDTO searchImage(Long id);

    Set<ImageDTO> listImages();

    Image addImage(ImageDTO imageDTO);

    void editImage(ImageDTO imageDTO);

    void deleteImage(Long id) throws ResourceNotFoundException;

}


