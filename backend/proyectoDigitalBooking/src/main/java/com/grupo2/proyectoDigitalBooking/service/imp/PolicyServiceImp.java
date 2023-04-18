package com.grupo2.proyectoDigitalBooking.service.imp;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
import com.grupo2.proyectoDigitalBooking.model.Policy;
import com.grupo2.proyectoDigitalBooking.model.dto.PolicyDTO;
import com.grupo2.proyectoDigitalBooking.repository.IPolicyRepository;
import com.grupo2.proyectoDigitalBooking.service.interfaces.PolicyService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class PolicyServiceImp implements PolicyService {

    @Autowired
    private IPolicyRepository policyRepository;

    @Autowired
    ObjectMapper mapper;

    private static final Logger logger = Logger.getLogger(CategoryServiceImp.class);

    @Override
    public PolicyDTO searchPolicy(Long id) {
        Optional<Policy> policy = policyRepository.findById(id);
        PolicyDTO policyDTO = null;
        if(policy.isPresent())
            policyDTO = mapper.convertValue(policy, PolicyDTO.class);
        logger.info("Se encontró la politica: "+policyDTO.getTitle());

        return policyDTO;
    }

    @Override
    public Set<PolicyDTO> listPolicies() {
        List<Policy> policies = policyRepository.findAll();
        Set<PolicyDTO> policiesDTO = new HashSet<>();

        for (Policy policy:policies) {
            policiesDTO.add(mapper.convertValue(policy, PolicyDTO.class));
        }
        logger.info("Se listaron todas las politicas.");
        return  policiesDTO;
    }

    @Override
    public Policy addPolicy(PolicyDTO policyDTO) {
        Policy policy = null;

        if(policyDTO.getId() != null) {
            policy = policyRepository.findById(policyDTO.getId()).orElse(null);
        }
        if(policy == null) {
            policy = mapper.convertValue(policyDTO, Policy.class);
            logger.info("Se creó la politica: "+policyDTO.getTitle());
            policy = policyRepository.save(policy);
        }
        return policy;
    }

    @Override
    public void editPolicy(PolicyDTO policyDTO) {
        Policy policy = mapper.convertValue(policyDTO, Policy.class);
        logger.info("Se editó la politica: "+policyDTO.getId());
        policyRepository.save(policy);
    }

    @Override
    public void deletePolicy(Long id) throws ResourceNotFoundException {
        if (searchPolicy(id) == null)
            throw new ResourceNotFoundException("No existe politica con id "+id);

        policyRepository.deleteById(id);
        logger.info("Se eliminó la politica: "+id);
    }
}

