package com.grupo2.proyectoDigitalBooking.utils;

public class Constants {

    public class SuccessResponse{
        public static final String ENTITY_CREATED = "Created successfully";
        public static final String ENTITY_UPDATED = "Updated successfully";
        public static final String ENTITY_DELETED = "Deleted successfully";
        public static final String GET_ALL = "All results found successfully";
        public static final String GET_ALL_RANDOM = "All results found successfully in random order";
        public static final String FIND_ENTITY_BY_ID = "Found by id successfully";
        public static final String GET_RESERVATION_BY_ID = "Get Reservation successfully";
        public static final String USER_CREATED = "User created successfully";
        public static final String ROLE_CREATED = "RoleUser created successfully";
        public static final String RESERVATION_CREATED = "Reservation created successfully";
        public static final String RESERVATION_DELETED  = "Reservation canceled successfully";
    }

    public class ErrorResponse {
        public static final String ENTITY_NOT_FOUND = "Not found results";
       public static final String RESERVATION_NOT_FOUND = "Reservation not found";
    }

    public class Endpoints {

        //LOGIN
        public static final String LOGIN="/login";

        //ENTITIES
        public static final String CATEGORIES="/categories";
        public static final String PRODUCTS = "/products";
        public static final String CITIES = "/cities";
        public static final String FEATURES = "/features";
        public static final String IMAGES = "/images";
        public static final String POLICIES = "/policies";
        public static final String SCORES = "/scores";
        public static final String USERS = "/users";
        public static final String ROLES = "/roles";
        public static final String RESERVATION = "/reservation";

        //SWAGGER
        public static final String SWAGGER_UI_HTML = "/swagger-ui.html";
        public static final String SWAGGER_UI = "/swagger-ui/**";
        public static final String SWAGGER_DOCS = "/v3/api-docs";
        public static final String SWAGGER_RESOURCES = "/swagger-resources/**";

        //CRUD
        public static final String GET_BY_ID = "/search/{id}";
        public static final String CREATE = "/create";
        public static final String UPDATE = "/update/{id}";
        public static final String DELETE = "/delete/{id}";
        public static final String LIST_ALL = "/listAll";

        public static final String RANDOM = "/random";
        public static final String GET_PRODUCTS_BY_CITY = "/city/{name}";
        public static final String GET_PRODUCTS_BY_CATEGORY = "/category/{title}";
        public static final String GET_PRODUCTS_BY_CITY_DATE = "/dates";
    }

}
