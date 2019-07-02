package com.sunlife.groupweb.member.databaseLayer;

import java.util.List;

import com.sunlife.groupweb.member.models.Form;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface FormRepository extends MongoRepository<Form, String> {

    List<Form> findAll();

    @Query("{ ?0 : ?1 }")
    List<Form> findByOneField(String field, String search);

    @Query("{ ?0 : ?1, ?2 : ?3 }")
    List<Form> findByTwoFields(String field1, String search1, String field2, String search2);

    @Query("{ ?0 : ?1, ?2 : ?3, ?4 : ?5 }")
    List<Form> findByThreeFields(String field1, String search1, String field2, String search2, String field3, String search3);

    @Query("{ ci : ?0, ss: ?1, sc: ?2 }")
    List<Form> findSingleForm(String coverageType, String sourceSystem, String state);

}
