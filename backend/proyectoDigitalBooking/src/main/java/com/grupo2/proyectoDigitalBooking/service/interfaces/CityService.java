package com.grupo2.proyectoDigitalBooking.service.interfaces;

import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
import com.grupo2.proyectoDigitalBooking.model.City;
import com.grupo2.proyectoDigitalBooking.model.dto.CityDTO;
import java.util.Set;

public interface CityService {

    City addCity(CityDTO cityDTO);

    CityDTO searchCity(Long id);

    void editCity(CityDTO cityDTO);

    void deleteCity (Long id) throws ResourceNotFoundException;

    Set<CityDTO> listCities();

}
