package com.grupo2.proyectoDigitalBooking.service.imp;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
import com.grupo2.proyectoDigitalBooking.model.Feature;
import com.grupo2.proyectoDigitalBooking.model.dto.FeatureDTO;
import com.grupo2.proyectoDigitalBooking.repository.IFeatureRepository;
import com.grupo2.proyectoDigitalBooking.service.interfaces.FeatureService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class FeatureServiceImp implements FeatureService {


    @Autowired
    private IFeatureRepository featureRepository;

    @Autowired
    ObjectMapper mapper;

    private static final Logger logger = Logger.getLogger(CategoryServiceImp.class);

    @Override
    public Feature addFeature(FeatureDTO featureDTO) {
        Feature feature = null;
        if(featureDTO.getId() != null) {
            feature = featureRepository.findById(featureDTO.getId()).orElse(null);
        }
        if(feature == null) {
            feature = mapper.convertValue(featureDTO,Feature.class);
            logger.info("Se creó la caracteristica: "+featureDTO.getName());
            feature = featureRepository.save(feature);
        }
        return feature;
    }

    @Override
    public FeatureDTO searchFeature(Long id) {
        Optional<Feature> feature = featureRepository.findById(id);
        FeatureDTO featureDTO = null;
        if(feature.isPresent())
            featureDTO = mapper.convertValue(feature, FeatureDTO.class);
        logger.info("Se encontró la caracteristica: "+featureDTO.getName());

        return featureDTO;
    }

    @Override
    public void editFeature(FeatureDTO featureDTO) {
        Feature feature = mapper.convertValue(featureDTO,Feature.class);
        featureRepository.save(feature);
        logger.info("Se actualizó la caracteristica: "+featureDTO.getId());
    }

    @Override
    public void deleteFeature(Long id) throws ResourceNotFoundException {
        if (searchFeature(id) == null)
            throw new ResourceNotFoundException("No existe caracteristica con id "+id);
        featureRepository.deleteById(id);
        logger.info("Se eliminó la caracteristica: "+id);
    }

    @Override
    public Set<FeatureDTO> listFeatures() {
        List<Feature> features = featureRepository.findAll();
        Set<FeatureDTO> featuresDTO = new HashSet<>();

        for (Feature feature:features) {
            featuresDTO.add(mapper.convertValue(feature, FeatureDTO.class));
        }
        logger.info("Se listaron todas las caracteristicas.");
        return  featuresDTO;
    }
}


