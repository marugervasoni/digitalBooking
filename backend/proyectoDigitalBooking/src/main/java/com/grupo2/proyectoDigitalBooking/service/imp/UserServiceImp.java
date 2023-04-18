package com.grupo2.proyectoDigitalBooking.service.imp;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
import com.grupo2.proyectoDigitalBooking.model.User;
import com.grupo2.proyectoDigitalBooking.model.dto.UserDTO;
import com.grupo2.proyectoDigitalBooking.repository.IUserRepository;
import com.grupo2.proyectoDigitalBooking.service.interfaces.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    ObjectMapper mapper;

    private static final Logger logger = Logger.getLogger(CategoryServiceImp.class);

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public User addUser(UserDTO userDTO) {
        User user = null;

        if (userDTO.getId() != null) {
            user = userRepository.findById(userDTO.getId()).orElse(null);
        }
        if (user == null) {
            user = mapper.convertValue(userDTO, User.class);
            String encryptedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encryptedPassword);

                logger.info("Se creó el usuario: " + userDTO.getUsername());
                user = userRepository.save(user);
            }

            return user;
    }

        @Override
        public UserDTO searchUser (Integer id){
            Optional<User> user = userRepository.findById(id);
            UserDTO userDTO = null;
            if (user.isPresent())
                userDTO = mapper.convertValue(user, UserDTO.class);
            logger.info("Se encontró el usuario: " + userDTO.getId());

            return userDTO;
        }

        @Override
        public void editUser (UserDTO userDTO){
            User user = mapper.convertValue(userDTO, User.class);
            logger.info("Se editó el usuario: " + userDTO.getUsername());
            userRepository.save(user);
        }

        @Override
        public void deleteUser (Integer id) throws ResourceNotFoundException {
            if (searchUser(id) == null)
                throw new ResourceNotFoundException("No existe usuario con id " + id);
            logger.info("Se eliminó el usuario: " + id);
            userRepository.deleteById(id);
        }

        @Override
        public Set<UserDTO> listUsers () {
            List<User> users = userRepository.findAll();
            Set<UserDTO> usersDTO = new HashSet<>();

            for (User user : users) {
                usersDTO.add(mapper.convertValue(user, UserDTO.class));
            }
            logger.info("Se listaron los usuarios.");
            return usersDTO;
        }
}
