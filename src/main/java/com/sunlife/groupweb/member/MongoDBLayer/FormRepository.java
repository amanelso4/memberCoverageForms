package com.sunlife.groupweb.member.MongoDBLayer;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface FormRepository extends MongoRepository<Form, String> {

   List<Form> findBySc(String sc);
   List<Form> findAll();

   @Query("{ci : ?0}")
   List<Form> findByCi(String ci);

   @Query("{ ?0 : ?1 }")
   List<Form> findByCustomStuffs(String field, String search);

}
