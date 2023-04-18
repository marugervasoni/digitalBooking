package com.grupo2.proyectoDigitalBooking.service.imp;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
import com.grupo2.proyectoDigitalBooking.model.Score;
import com.grupo2.proyectoDigitalBooking.model.dto.ScoreDTO;
import com.grupo2.proyectoDigitalBooking.repository.IScoreRepository;
import com.grupo2.proyectoDigitalBooking.service.interfaces.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ScoreServiceImp implements ScoreService {

    @Autowired
    private IScoreRepository scoreRepository;

    @Autowired
    ObjectMapper mapper;

    @Override
    public Score addScore(ScoreDTO scoreDTO) {
        Score score = null;

        if (scoreDTO.getId() != null) {
            score = scoreRepository.findById(scoreDTO.getId()).orElse(null);
        }
        if (score == null) {
            score = mapper.convertValue(scoreDTO, Score.class);
            score = scoreRepository.save(score);
        }
        return score;
    }

    @Override
    public ScoreDTO searchScore(Long id) {
        Optional<Score> score = scoreRepository.findById(id);
        ScoreDTO scoreDTO = null;
        if(score.isPresent())
            scoreDTO = mapper.convertValue(score,ScoreDTO.class);

        return scoreDTO;
    }

    @Override
    public void editScore(ScoreDTO scoreDTO) {
        Score score = mapper.convertValue(scoreDTO,Score.class);
        scoreRepository.save(score);
    }

    @Override
    public void deleteScore(Long id) throws ResourceNotFoundException {
        if (searchScore(id) == null)
            throw new ResourceNotFoundException("No existe puntuacion con id "+id);

        scoreRepository.deleteById(id);
    }

    @Override
    public Set<ScoreDTO> listScores() {
        List<Score> scores = scoreRepository.findAll();
        Set<ScoreDTO> scoresDTO = new HashSet<>();

        for (Score score:scores) {
            scoresDTO.add(mapper.convertValue(score, ScoreDTO.class));
        }
        return  scoresDTO;
    }
}
