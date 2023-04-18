package com.grupo2.proyectoDigitalBooking.service.interfaces;

import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
import com.grupo2.proyectoDigitalBooking.model.Feature;
import com.grupo2.proyectoDigitalBooking.model.dto.FeatureDTO;
import java.util.Set;

public interface FeatureService {

    Feature addFeature(FeatureDTO featureDTO);

    FeatureDTO searchFeature(Long id);

    void editFeature(FeatureDTO featureDTO);

    void deleteFeature(Long id) throws ResourceNotFoundException;

    Set<FeatureDTO> listFeatures();
}

