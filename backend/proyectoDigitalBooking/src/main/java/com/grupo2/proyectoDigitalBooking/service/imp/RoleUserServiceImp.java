package com.grupo2.proyectoDigitalBooking.service.imp;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
import com.grupo2.proyectoDigitalBooking.model.RoleUser;
import com.grupo2.proyectoDigitalBooking.model.dto.RoleUserDTO;
import com.grupo2.proyectoDigitalBooking.repository.IRoleUserRepository;
import com.grupo2.proyectoDigitalBooking.service.interfaces.RoleUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class RoleUserServiceImp implements RoleUserService {

    @Autowired
    private IRoleUserRepository roleUserRepository;

    @Autowired
    ObjectMapper mapper;

    @Override
    public RoleUser addRole(RoleUserDTO roleUserDTO) {
        RoleUser roleUser = null;
        if(roleUserDTO.getId() != null) {
            roleUser = roleUserRepository.findById(roleUserDTO.getId()).orElse(null);
        }
        if(roleUser == null) {
            roleUser = mapper.convertValue(roleUserDTO,RoleUser.class);
            roleUser = roleUserRepository.save(roleUser);
        }
        return roleUser;
    }

    @Override
    public RoleUserDTO searchRole(Long id) {
        Optional<RoleUser> roleUser = roleUserRepository.findById(id);
        RoleUserDTO roleUserDTO = null;
        if(roleUser.isPresent())
            roleUserDTO = mapper.convertValue(roleUser,RoleUserDTO.class);

        return roleUserDTO;
    }

    @Override
    public void editRole(RoleUserDTO roleUserDTO) {
        RoleUser roleUser = mapper.convertValue(roleUserDTO,RoleUser.class);
        roleUserRepository.save(roleUser);
    }

    @Override
    public void deleteRole(Long id) throws ResourceNotFoundException {
        if (searchRole(id) == null)
            throw new ResourceNotFoundException("No existe rol con id "+id);
        roleUserRepository.deleteById(id);
    }

    @Override
    public Set<RoleUserDTO> listRoles() {
        List<RoleUser> rolesUser = roleUserRepository.findAll();
        Set<RoleUserDTO> rolesUserDTO = new HashSet<>();

        for (RoleUser roleUser : rolesUser) {
            rolesUserDTO.add(mapper.convertValue(roleUser, RoleUserDTO.class));
        }
        return  rolesUserDTO;
    }
}
