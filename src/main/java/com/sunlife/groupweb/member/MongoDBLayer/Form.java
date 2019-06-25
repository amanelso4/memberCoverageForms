package com.sunlife.groupweb.member.MongoDBLayer;

import com.sun.javafx.beans.IDProperty;
import org.springframework.data.annotation.Id;

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
        this.subForm[] = subForm[];
        this.fl = fl;
        this.sc = sc;
        this.ss = ss;
    }

}
