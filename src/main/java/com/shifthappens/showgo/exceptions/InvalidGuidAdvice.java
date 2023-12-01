package com.shifthappens.showgo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

//Advice for InvalidGuidException
@ControllerAdvice
public class InvalidGuidAdvice {

  @ResponseBody
  @ExceptionHandler(InvalidGuidException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  String invalidGuidExceptionHandler(InvalidGuidException ex) {
    return ex.getMessage();
  }
}
