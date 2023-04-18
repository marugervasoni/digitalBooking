package com.grupo2.proyectoDigitalBooking.service.interfaces;

import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
import com.grupo2.proyectoDigitalBooking.model.Score;
import com.grupo2.proyectoDigitalBooking.model.dto.ScoreDTO;

import java.util.Set;

public interface ScoreService {

    Score addScore(ScoreDTO scoreDTO);

    ScoreDTO searchScore(Long id);

    void editScore(ScoreDTO scoreDTO);

    void deleteScore (Long id) throws ResourceNotFoundException;

    Set<ScoreDTO> listScores();
}
