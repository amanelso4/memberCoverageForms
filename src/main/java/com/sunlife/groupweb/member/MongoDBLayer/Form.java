package com.sunlife.groupweb.member.MongoDBLayer;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;

@Document(collection="memberCoverageForms")

public class Form {

    @Id

    public String id; // OBJECT_ID
    public String ci; // COVERAGE TYPE
    public boolean fhf; // IDK - deprecated, default to false
    public subForm[] fl; // NESTED ARRAY OF DOCUMENTS - see subForm class
    public String sc; // COVERAGE STATE
    public String ss; // SOURCE SYSTEM

    // Constructor w/o id needed (mongo handles id generation)
    public Form(String ci, boolean fhf, subForm[] fl, String sc, String ss) {
        this.ci = ci;
        this.fhf = fhf;
        this.fl = fl;
        this.sc = sc;
        this.ss = ss;
    }

    @Override
    public String toString() {
        return "Form{" +
                "id='" + id + '\'' +
                ", ci='" + ci + '\'' +
                ", fhf=" + fhf +
                ", fl=" + Arrays.toString(fl) +
                ", sc='" + sc + '\'' +
                ", ss=" + ss +
                '}';
    }
}
