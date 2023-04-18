package com.grupo2.proyectoDigitalBooking.service.imp;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo2.proyectoDigitalBooking.exceptions.ResourceNotFoundException;
import com.grupo2.proyectoDigitalBooking.model.*;
import com.grupo2.proyectoDigitalBooking.model.dto.*;
import com.grupo2.proyectoDigitalBooking.repository.*;
import com.grupo2.proyectoDigitalBooking.service.interfaces.*;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ProductServiceImp implements ProductService {

    @Autowired
    private IProductRepository productRepository;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private CityService cityService;
    @Autowired
    private ImageService imageService;
    @Autowired
    private PolicyService policyService;
    @Autowired
    private FeatureService featureService;
    @Autowired
    private ScoreService scoreService;

    @Autowired
    ObjectMapper mapper;

    private static final Logger logger = Logger.getLogger(CategoryServiceImp.class);

    @Override
    public Set<ProductDTO> listProducts() {
        List<Product> products = productRepository.findAll();
        Set<ProductDTO> productsDTO = new HashSet<>();
        for (Product product : products){
            productsDTO.add(mapper.convertValue(product, ProductDTO.class));
            logger.info("Se listaron todos los alojamientos.");
        }
        return productsDTO;
    }

    @Override
    public Product searchProduct(Long id) {
        Optional<Product> product = productRepository.findById(id);
        Product productFounded = null;
        if(product.isPresent())
            productFounded = product.get();
        logger.info("Se encontró el alojamiento: "+productFounded.getName());

        return productFounded;
    }

    @Override
    public Product addProduct(ProductDTO productDTO) {
        Product product = mapper.convertValue(productDTO,Product.class);

        //si ya tengo entidad creada paso id
        if(productDTO.getCategory() != null){
            Category category = mapper.convertValue(productDTO.getCategory(), Category.class);
            product.setCategory(category);
        }
        if(productDTO.getCity() != null){
            City city = mapper.convertValue(productDTO.getCity(), City.class);
            product.setCity(city);
        }
        if(productDTO.getImages() != null){
            List<Image> images = new ArrayList<>();
            for (Object imageObject : productDTO.getImages()) {
                Image image = mapper.convertValue(imageObject, Image.class);
                images.add(image);
            }
            product.setImages(images);
        }
        if(productDTO.getPolicies() != null){
            List<Policy> policies = new ArrayList<>();
            for (Object policyObject : productDTO.getPolicies()) {
                Policy policy = mapper.convertValue(policyObject, Policy.class);
                policies.add(policy);
            }
            product.setPolicies(policies);
        }
        if(productDTO.getFeatures() != null){
            List<Feature> features = new ArrayList<>();
            for (Object featureObject: productDTO.getFeatures()) {
                Feature feature = mapper.convertValue(featureObject, Feature.class);
                features.add(feature);
            }
            product.setFeatures(features);
        }
        if(productDTO.getScores() != null){
            List<Score> scores = new ArrayList<>();
            for (Object scoreObject : productDTO.getScores()) {
                Score score = mapper.convertValue(scoreObject, Score.class);
                scores.add(score);
            }
            product.setScores(scores);
        }
        //si no tengo entidad creada paso el dato completo
        if (product.getCategory() != null){
            Category category = categoryService.addCategory(productDTO.getCategory());
            product.getCategory().setId(category.getId());
        }
        if (product.getCity() != null){
            City city = cityService.addCity(productDTO.getCity());
            product.getCity().setId(city.getId());
        }
        if (productDTO.getImages() != null) {
            List<Image> images = new ArrayList<>();
            for (ImageDTO imageDTO : productDTO.getImages()) {
                Image image = imageService.addImage(imageDTO);
                images.add(image);
            }
            product.setImages(images);
        }
        if (productDTO.getPolicies() != null) {
            List<Policy> policies = new ArrayList<>();
            for (PolicyDTO policyDTO : productDTO.getPolicies()) {
                Policy policy = policyService.addPolicy(policyDTO);
                policies.add(policy);
            }
            product.setPolicies(policies);
        }
        if (productDTO.getFeatures() != null) {
            List<Feature> features = new ArrayList<>();
            for (FeatureDTO featureDTO : productDTO.getFeatures()) {
                Feature feature = featureService.addFeature(featureDTO);
                features.add(feature);
            }
            product.setFeatures(features);
        }
        if (productDTO.getScores() != null) {
            List<Score> scores = new ArrayList<>();
            for (ScoreDTO scoreDTO : productDTO.getScores()) {
                Score score = scoreService.addScore(scoreDTO);
                scores.add(score);
            }
            product.setScores(scores);
        }
        logger.info("Se creó el alojamiento: "+productDTO.getName());
        return productRepository.save(product);
    }

    @Override
    public void editProduct(ProductDTO productDTO) {
        Product product = mapper.convertValue(productDTO,Product.class);
        productRepository.save(product);
        logger.info("Se actualizó el alojamiento: "+productDTO.getName());
    }

    @Override
    public void deleteProduct(Long id) throws ResourceNotFoundException {
        if (searchProduct(id) == null)
            throw new ResourceNotFoundException("No existe el Producto con id " + id);
        logger.info("Se eliminó el alojamiento: "+id);
        productRepository.deleteById(id);
    }

    @Override
    public List<Product> getRandomProducts() {
        logger.info("Se listaron aleatoriamente todos los alojamientos");
        return productRepository.findRandomProducts();
        //actualmente devuelve dto, fijarse si funciona asi o si mejor que devulva producto
    }

    @Override
    public List<ProductDTO> searchByCity(String name) {
        List<Product> products = productRepository.findByCityName(name);
        List<ProductDTO> productsDTO = new ArrayList<>();

        for (Product product : products) {
            productsDTO.add(mapper.convertValue(product, ProductDTO.class));
            logger.info("Se encontraron "+ productsDTO.size()+ " alojamientos en la ciudad: "+name);
        }
        return productsDTO;
    }

    @Override
    public List<ProductDTO> searchByCategory(String title) {
        List<Product> products = productRepository.findByCategoryTitle(title);
        List<ProductDTO> productsDTO = new ArrayList<>();

        for (Product product : products) {
            productsDTO.add(mapper.convertValue(product, ProductDTO.class));
            logger.info("Se encontraron "+ productsDTO.size()+ " alojamientos de la categoria: "+title);
        }
        return productsDTO;
    }

    @Override
    public List<Product> searchByCityAndDate(String city, Date initialDate, Date finalDate) throws ResourceNotFoundException {
        List<Product> products = productRepository.findByCityName(city);
        List<Product> searchedProducts =new ArrayList<>();
        for (Product product : products) {
            List<Reservation> reservations = product.getReservations();
            product.getAvailability();
            for (Reservation reservation : reservations) {
                Date initialReservation = reservation.getInitialDate();
                Date finalReservation = reservation.getFinalDate();
                if (initialReservation.before(finalDate) && finalReservation.after(initialDate) ||
                        initialDate.equals(finalDate) || finalReservation.equals(finalDate)) {
                    product.setAvailability(false);
                    break;
                }
            }
            if (product.getAvailability() == true) {
                searchedProducts.add(product);
            }
        }
        logger.info("Se encontraron "+ searchedProducts.size()+ " alojamientos por ciudad y fechas.");
        return searchedProducts;
    }

}