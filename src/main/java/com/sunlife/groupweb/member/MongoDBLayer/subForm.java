package com.sunlife.groupweb.member.MongoDBLayer;

import org.springframework.data.annotation.Id;

public class subForm {

    public String ds; // FORM NAME
    public String fl; // FORM LINK
    public String ft; // FORM TYPE
    public boolean fill; // FORM FILLABLE - deprecated, default to true
    public String fh; // FORM DESCRIPTION
    public String fc; // FORM ID

    public subForm() {}

    public subForm(String ds, String fl, String ft, boolean fill, String fh, String fc) {
        this.ds = ds;
        this.fl = fl;
        this.ft = ft;
        this.fill = fill;
        this.fh = fh;
        this.fc = fc;
    }

    @Override
    public String toString() {
        return String.format(
                "subForm[ds='%s', fl='%s', ft='%s', fill=%s, fh='%s', fc='%s']",
                ds, fl, ft, fill, fh, fc);
    }
}
