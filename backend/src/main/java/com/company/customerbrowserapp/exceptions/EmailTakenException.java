package com.company.customerbrowserapp.exceptions;

public class EmailTakenException extends Exception  {
    public EmailTakenException(String email){
        System.out.println("PEmail taken on: " + email);
    }
}
