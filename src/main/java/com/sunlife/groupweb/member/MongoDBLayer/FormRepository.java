package com.sunlife.groupweb.member.MongoDBLayer;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface FormRepository extends MongoRepository<Form, String> {

    public Form findbyState(String sc);

}
