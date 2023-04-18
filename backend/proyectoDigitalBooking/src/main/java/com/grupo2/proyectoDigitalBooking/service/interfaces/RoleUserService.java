package com.grupo2.proyectoDigitalBooking.service.interfaces;

import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
import com.grupo2.proyectoDigitalBooking.model.RoleUser;
import com.grupo2.proyectoDigitalBooking.model.dto.RoleUserDTO;

import java.util.Set;

public interface RoleUserService {

    RoleUserDTO searchRole(Long id);

    RoleUser addRole(RoleUserDTO roleUserDTO);

    void editRole(RoleUserDTO roleUserDTO);

    void deleteRole(Long id) throws ResourceNotFoundException;

    Set<RoleUserDTO> listRoles();
}
