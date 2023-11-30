package com.shifthappens.showgo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

//Advice for InvalidEventCreationException
@ControllerAdvice
public class InvalidEventCreationAdvice {
    @ResponseBody
  @ExceptionHandler(InvalidEventCreationException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  String invalidEventCreationHandler(InvalidEventCreationException ex) {
    return ex.getMessage();
  }
}
