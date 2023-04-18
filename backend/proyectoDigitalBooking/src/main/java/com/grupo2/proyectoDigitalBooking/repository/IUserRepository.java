package com.grupo2.proyectoDigitalBooking.repository;

import com.grupo2.proyectoDigitalBooking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


//@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {

    Optional<User> findOneByEmail(String email);

}
