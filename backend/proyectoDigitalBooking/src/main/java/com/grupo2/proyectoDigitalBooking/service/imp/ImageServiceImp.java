package com.grupo2.proyectoDigitalBooking.service.imp;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
import com.grupo2.proyectoDigitalBooking.model.Image;
import com.grupo2.proyectoDigitalBooking.model.dto.ImageDTO;
import com.grupo2.proyectoDigitalBooking.repository.IImageRepository;
import com.grupo2.proyectoDigitalBooking.service.interfaces.ImageService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ImageServiceImp implements ImageService {

    @Autowired
    private IImageRepository imageRepository;

    @Autowired
    ObjectMapper mapper;

    private static final Logger logger = Logger.getLogger(CategoryServiceImp.class);

    @Override
    public ImageDTO searchImage(Long id) {
        Optional<Image> image = imageRepository.findById(id);
        ImageDTO imageDTO = null;
        if(image.isPresent())
            imageDTO = mapper.convertValue(image, ImageDTO.class);
        logger.info("Se encontró la imagen: "+imageDTO.getTitle());

        return imageDTO;
    }

    @Override
    public Set<ImageDTO> listImages() {
        List<Image> images = imageRepository.findAll();
        Set<ImageDTO> imagesDTO = new HashSet<>();

        for (Image image:images) {
            imagesDTO.add(mapper.convertValue(image, ImageDTO.class));
        }
        logger.info("Se listaron todas las imagenes.");
        return  imagesDTO;
    }

    @Override
    public Image addImage(ImageDTO imageDTO) {
        Image image = null;
        if(imageDTO.getId() != null) {
            image = imageRepository.findById(imageDTO.getId()).orElse(null);
        }
        if(image == null) {
            image = mapper.convertValue(imageDTO,Image.class);
            logger.info("Se creó la imagen: "+imageDTO.getTitle());
            image = imageRepository.save(image);
        }
        return image;
    }

    @Override
    public void editImage(ImageDTO imageDTO) {
        Image image = mapper.convertValue(imageDTO,Image.class);
        imageRepository.save(image);
        logger.info("Se actualizó la imagen: "+imageDTO.getId());
    }

    @Override
    public void deleteImage(Long id) throws ResourceNotFoundException {
        if (searchImage(id) == null)
            throw new ResourceNotFoundException("No existe imagen con id "+id);
        imageRepository.deleteById(id);
        logger.info("Se eliminó la imagen: "+id);
    }
}

