package com.grupo2.proyectoDigitalBooking.security;

import com.grupo2.proyectoDigitalBooking.utils.Constants;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

@Configuration
@AllArgsConstructor
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class WebSecurityConfig {

    private final UserDetailsService userDetailsService;
    private final JWTAuthorizationFilter jwtAuthorizationFilter;

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authManager) throws Exception {
        JWTAuthenticationFilter jwtAuthenticationFilter = new JWTAuthenticationFilter();
        jwtAuthenticationFilter.setAuthenticationManager(authManager);
        jwtAuthenticationFilter.setFilterProcessesUrl("/login");

        return http
                .cors()
                .and()
                .csrf().disable()
                .authorizeHttpRequests(authorize ->
                        authorize
                                //TODO Geral: acá probe simplificar los endpoints sin especificar metodos y es lo que mejor funciono asi que
                                // si estas de acuerdo lo mantenemos, obvio primero probalo
                                .requestMatchers(
                                        Constants.Endpoints.USERS+Constants.Endpoints.CREATE,
                                        Constants.Endpoints.SWAGGER_UI,
                                        Constants.Endpoints.SWAGGER_DOCS,
                                        Constants.Endpoints.SWAGGER_RESOURCES,
                                        Constants.Endpoints.SWAGGER_UI_HTML,
                                        Constants.Endpoints.LOGIN,
                                        Constants.Endpoints.CATEGORIES,
                                        Constants.Endpoints.CITIES,
                                        Constants.Endpoints.FEATURES,
                                        Constants.Endpoints.POLICIES,
                                        //Constants.Endpoints.SCORES,
                                        Constants.Endpoints.IMAGES,
                                        Constants.Endpoints.ROLES).permitAll()
                                .requestMatchers(HttpMethod.GET).permitAll()
                                .requestMatchers(
                                        Constants.Endpoints.PRODUCTS,
                                        Constants.Endpoints.RESERVATION).hasRole("ADMIN_ROLE")
                                .requestMatchers(
                                        Constants.Endpoints.SCORES,
                                        Constants.Endpoints.RESERVATION).hasRole("USER_ROLE")
                                //.anyRequest().authenticated()
                                .anyRequest().permitAll()
                                /*
                                .requestMatchers(
                                        Constants.Endpoints.USERS+Constants.Endpoints.CREATE,
                                        Constants.Endpoints.SWAGGER_UI,
                                        Constants.Endpoints.SWAGGER_DOCS,
                                        Constants.Endpoints.SWAGGER_RESOURCES,
                                        Constants.Endpoints.SWAGGER_UI_HTML,
                                        Constants.Endpoints.LOGIN,
                                        Constants.Endpoints.PRODUCTS+Constants.Endpoints.RANDOM,
                                        Constants.Endpoints.ROLES+Constants.Endpoints.CREATE).permitAll()
                                .requestMatchers(HttpMethod.GET).permitAll()
                                .requestMatchers(
                                        Constants.Endpoints.PRODUCTS+Constants.Endpoints.CREATE,
                                        Constants.Endpoints.PRODUCTS+Constants.Endpoints.UPDATE,
                                        Constants.Endpoints.PRODUCTS+Constants.Endpoints.DELETE,
                                        Constants.Endpoints.CATEGORIES+Constants.Endpoints.CREATE,
                                        Constants.Endpoints.CATEGORIES+Constants.Endpoints.UPDATE,
                                        Constants.Endpoints.CATEGORIES+Constants.Endpoints.DELETE,
                                        Constants.Endpoints.CITIES+Constants.Endpoints.CREATE,
                                        Constants.Endpoints.CITIES+Constants.Endpoints.UPDATE,
                                        Constants.Endpoints.CITIES+Constants.Endpoints.DELETE,
                                        Constants.Endpoints.FEATURES+Constants.Endpoints.CREATE,
                                        Constants.Endpoints.FEATURES+Constants.Endpoints.UPDATE,
                                        Constants.Endpoints.FEATURES+Constants.Endpoints.DELETE,
                                        Constants.Endpoints.IMAGES+Constants.Endpoints.CREATE,
                                        Constants.Endpoints.IMAGES+Constants.Endpoints.UPDATE,
                                        Constants.Endpoints.IMAGES+Constants.Endpoints.DELETE,
                                        Constants.Endpoints.POLICIES+Constants.Endpoints.CREATE,
                                        Constants.Endpoints.POLICIES+Constants.Endpoints.UPDATE,
                                        Constants.Endpoints.POLICIES+Constants.Endpoints.DELETE,
                                        Constants.Endpoints.ROLES+Constants.Endpoints.UPDATE,
                                        Constants.Endpoints.ROLES+Constants.Endpoints.DELETE).hasRole("ADMIN_ROLE")
                                .requestMatchers(
                                        Constants.Endpoints.RESERVATION+Constants.Endpoints.CREATE,
                                        Constants.Endpoints.RESERVATION+Constants.Endpoints.UPDATE,
                                        Constants.Endpoints.RESERVATION+Constants.Endpoints.DELETE,
                                        Constants.Endpoints.SCORES+Constants.Endpoints.CREATE,
                                        Constants.Endpoints.SCORES+Constants.Endpoints.UPDATE,
                                        Constants.Endpoints.USERS+Constants.Endpoints.UPDATE,
                                        Constants.Endpoints.USERS+Constants.Endpoints.DELETE).hasAnyRole("ADMIN_ROLE", "USER_ROLE")
                                .anyRequest().authenticated()
                                //.anyRequest().permitAll()
                                 */
                )
                .httpBasic()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(jwtAuthenticationFilter)
                .addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder())
                .and()
                .build();
    }

}
