package com.grupo2.proyectoDigitalBooking.service.interfaces;

import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
import com.grupo2.proyectoDigitalBooking.model.User;
import com.grupo2.proyectoDigitalBooking.model.dto.UserDTO;

import java.util.Set;

public interface UserService {

    User addUser(UserDTO userDTO);

    UserDTO searchUser(Integer id);

    void editUser(UserDTO userDTO);

    void deleteUser (Integer id) throws ResourceNotFoundException;

    Set<UserDTO> listUsers();
}
