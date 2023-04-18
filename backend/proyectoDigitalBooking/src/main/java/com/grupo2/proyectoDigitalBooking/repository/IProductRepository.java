package com.grupo2.proyectoDigitalBooking.repository;

import com.grupo2.proyectoDigitalBooking.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IProductRepository extends JpaRepository<Product, Long> {

    Product findByName(String name);

    List<Product> findByCityName(String name);

    List<Product> findByCategoryTitle(String title);

    @Query(value = "SELECT p FROM products p ORDER BY RAND()",
            nativeQuery = true)
    List<Product> findRandomProducts();

}
