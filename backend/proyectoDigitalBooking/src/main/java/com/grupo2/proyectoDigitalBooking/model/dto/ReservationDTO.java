package com.grupo2.proyectoDigitalBooking.model.dto;

import lombok.*;
import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDTO {

    private Long id;

    private Double startTime;

    private Date initialDate;

    private Date finalDate;

    private Long productId;

}
