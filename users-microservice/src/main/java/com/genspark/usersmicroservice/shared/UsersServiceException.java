package com.genspark.usersmicroservice.shared;

public class UsersServiceException extends RuntimeException {

    public UsersServiceException(){}

    public UsersServiceException(String message)
    {
        super(message);
    }
}
