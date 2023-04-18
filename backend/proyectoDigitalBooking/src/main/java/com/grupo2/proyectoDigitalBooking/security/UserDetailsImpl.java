package com.grupo2.proyectoDigitalBooking.security;

import com.grupo2.proyectoDigitalBooking.model.User;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class UserDetailsImpl implements UserDetails {

    private final User user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(user.getRoleUser().getName()));
    }

    @Override
    public String getUsername(){
        return user.getEmail();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    public Integer getId() { return user.getId(); }

    public String getName() {return user.getUsername();}

    public String getLastName(){
        return user.getLastname();
    }

    public String getCity() {return user.getCity();}

    public String getRole() {return user.getRoleUser().getName();}

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
