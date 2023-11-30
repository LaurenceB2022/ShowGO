package com.shifthappens.showgo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class InvalidTicketBuyAdvice {

  @ResponseBody
  @ExceptionHandler(InvalidTicketBuyException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  String employeeNotFoundHandler(InvalidTicketBuyException ex) {
    return ex.getMessage();
  }
}
