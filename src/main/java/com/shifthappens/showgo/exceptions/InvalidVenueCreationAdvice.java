package com.shifthappens.showgo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

public class InvalidVenueCreationAdvice {
    @ResponseBody
  @ExceptionHandler(InvalidEventCreationException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  String employeeNotFoundHandler(InvalidEventCreationException ex) {
    return ex.getMessage();
  }
}
