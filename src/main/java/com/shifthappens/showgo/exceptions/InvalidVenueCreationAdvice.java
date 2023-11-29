package com.shifthappens.showgo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

//Advice for the InvalidVenueCreationException
@ControllerAdvice
public class InvalidVenueCreationAdvice {
  @ResponseBody
  @ExceptionHandler(InvalidVenueCreationException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  String invalidVenueCrationHandler(InvalidVenueCreationException ex) {
    return ex.getMessage();
  }
}
