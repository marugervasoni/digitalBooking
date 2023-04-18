 package com.grupo2.proyectoDigitalBooking.service.interfaces;

 import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
 import com.grupo2.proyectoDigitalBooking.model.Product;
 import com.grupo2.proyectoDigitalBooking.model.dto.ProductDTO;

 import java.util.Date;
 import java.util.List;
 import java.util.Set;

 public interface ProductService {

     Set<ProductDTO> listProducts();

     Product searchProduct(Long id);

     Product addProduct(ProductDTO productDTO);

     void editProduct(ProductDTO productDTO);

     void deleteProduct(Long id) throws ResourceNotFoundException;

     List<Product> getRandomProducts();

     List<ProductDTO> searchByCity(String city);

     List<ProductDTO> searchByCategory(String category);

     List<Product> searchByCityAndDate(String city, Date initialDate, Date finalDate) throws ResourceNotFoundException;

 }

