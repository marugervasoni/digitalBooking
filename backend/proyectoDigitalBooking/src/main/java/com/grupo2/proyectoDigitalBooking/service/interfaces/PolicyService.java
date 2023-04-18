package com.grupo2.proyectoDigitalBooking.service.interfaces;

import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
import com.grupo2.proyectoDigitalBooking.model.Policy;
import com.grupo2.proyectoDigitalBooking.model.dto.PolicyDTO;
import java.util.Set;

public interface PolicyService {

    PolicyDTO searchPolicy(Long id);

    Set<PolicyDTO> listPolicies();

    Policy addPolicy(PolicyDTO policyDTO);

    void editPolicy(PolicyDTO policyDTO);

    void deletePolicy(Long id) throws ResourceNotFoundException;

}
