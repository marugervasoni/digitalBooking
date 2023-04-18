package com.grupo2.proyectoDigitalBooking.service.imp;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
import com.grupo2.proyectoDigitalBooking.model.City;
import com.grupo2.proyectoDigitalBooking.model.dto.CityDTO;
import com.grupo2.proyectoDigitalBooking.repository.ICityRepository;
import com.grupo2.proyectoDigitalBooking.service.interfaces.CityService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CityServiceImp implements CityService {

    @Autowired
    private ICityRepository cityRepository;

    @Autowired
    ObjectMapper mapper;

    private static final Logger logger = Logger.getLogger(CategoryServiceImp.class);

    @Override
    public City addCity(CityDTO cityDTO) {
        City city = null;

        if(cityDTO.getId() != null) {
            city = cityRepository.findById(cityDTO.getId()).orElse(null);
        }
        if(city == null) {
            city = mapper.convertValue(cityDTO,City.class);
            logger.info("Se creó la ciudad: "+cityDTO.getName());
            city = cityRepository.save(city);
        }
        return city;
    }

    @Override
    public CityDTO searchCity(Long id) {
        Optional<City> city = cityRepository.findById(id);
        CityDTO cityDTO = null;
        if(city.isPresent())
            cityDTO = mapper.convertValue(city, CityDTO.class);
        logger.info("Se encontró la ciudad: "+cityDTO.getName());

        return cityDTO;
    }

    @Override
    public void editCity(CityDTO cityDTO) {
        City city = mapper.convertValue(cityDTO,City.class);
        cityRepository.save(city);
        logger.info("Se actualizó la ciudad: "+cityDTO.getId());
    }

    @Override
    public void deleteCity(Long id) throws ResourceNotFoundException{
        if (searchCity(id) == null)
            throw new ResourceNotFoundException("No existe ciudad con id "+id);
        logger.info("Se eliminó la ciudad: "+id);
        cityRepository.deleteById(id);
    }

    @Override
    public Set<CityDTO> listCities() {
        List<City> cities = cityRepository.findAll();
        Set<CityDTO> citiesDTO = new HashSet<>();

        for (City city:cities) {
            citiesDTO.add(mapper.convertValue(city, CityDTO.class));
        }
        logger.info("Se listaron todas las ciudades.");
        return  citiesDTO;
    }
}

