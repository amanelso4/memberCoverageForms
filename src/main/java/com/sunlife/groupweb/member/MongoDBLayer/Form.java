package com.sunlife.groupweb.member.MongoDBLayer;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;

@Document(collection="memberCoverageForms")

public class Form {

    @Id
    public String id;
    public String ci;
    public boolean fhf;
    public subForm[] fl;
    public String sc;
    public char ss;

    public Form() {}

    public Form(String id, String ci, boolean fhf, subForm[] fl, String sc, char ss) {
        this.id = id;
        this.ci = ci;
        this.fhf = fhf;
        this.fl = fl;
        this.sc = sc;
        this.ss = ss;
    }

    // Constructor w/o id needed (mongo handles id generation)
    public Form(String ci, boolean fhf, subForm[] fl, String sc, char ss) {
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
