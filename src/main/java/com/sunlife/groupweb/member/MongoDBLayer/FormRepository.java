package com.sunlife.groupweb.member.MongoDBLayer;

import java.util.List;

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

    @Query("{ ?0 : ?1, ?2 : ?3, ?4 : ?5, ?6 : ?7 }")
    List<Form> findByFourFields(String field1, String search1, String field2, String search2, String field3, String search3, String field4, String search4);

    @Query("{ ?0 : ?1, ?2 : ?3, ?4 : ?5, ?6 : ?7, ?8 : ?9 }")
    List<Form> findByFiveFields(String field1, String search1, String field2, String search2, String field3, String search3, String field4, String search4,
                                String field5, String search5);

    @Query("{ ?0 : ?1, ?2 : ?3, ?4 : ?5, ?6 : ?7, ?8 : ?9, ?10 : ?11 }")
    List<Form> findBySixFields(String field1, String search1, String field2, String search2, String field3, String search3, String field4, String search4,
                                String field5, String search5, String field6, String search6);

    @Query("{ ?0 : ?1, ?2 : ?3, ?4 : ?5, ?6 : ?7, ?8 : ?9, ?10 : ?11, ?12 : ?13 }")
    List<Form> findBySevenFields(String field1, String search1, String field2, String search2, String field3, String search3, String field4, String search4,
                               String field5, String search5, String field6, String search6, String field7, String search7);

    @Query("{ ci : ?0, ss: ?1, sc: ?2 }")
    List<Form> findSingleForm(String coverageType, String sourceSystem, String state);

    // If multiple states are being searched for, must use this notation:
    // SEARCH: { $in : [ 'state1', 'state2', 'state3' ] }

    // If a single nested field is being searched for, must use this notation:
    // FIELD: 'fl.fieldName'

    // If multiple nested fields are being searched for, must use this notation:
    // FIELD: 'fl'         SEARCH: { #elemMatch: { fill: true, ft: 'Continuance' }}
}
