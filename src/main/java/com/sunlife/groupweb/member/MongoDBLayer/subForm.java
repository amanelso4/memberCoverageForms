package com.sunlife.groupweb.member.MongoDBLayer;

import com.sun.javafx.beans.IDProperty;
import org.springframework.data.annotation.Id;

public class subForm {

    @Id
    public String ds;
    public String fl;
    public String ft;
    public boolean fill;
    public String fh;
    public String fc;

    public subForm() {}


    @Override public String toString() {
        return String.format(
                "subForm[ds='%s', fl='%s', ft='%s', fill=%s, fh='&s', fc='%s']",
                ds, fl, ft, fill, fh, fc);
    }
}
