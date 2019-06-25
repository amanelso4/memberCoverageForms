package com.sunlife.groupweb.member.MongoDBLayer;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface FormRepository extends MongoRepository<Form, String> {

   List<Form> findBySc(String sc);
   List<Form> findAll();

}
