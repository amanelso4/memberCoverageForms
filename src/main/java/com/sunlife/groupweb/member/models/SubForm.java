package com.sunlife.groupweb.member.models;

// Format of nested documents inside the mongo database
public class SubForm {

    public String ds; // FORM NAME
    public String fl; // FORM LINK
    public String ft; // FORM TYPE
    public boolean fill; // FORM FILLABLE - deprecated, default to true
    public String fh; // FORM DESCRIPTION
    public String fc; // FORM NUMBER


    public SubForm(String ds, String fl, String ft, boolean fill, String fh, String fc) {
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
                "SubForm[ds='%s', fl='%s', ft='%s', fill=%s, fh='%s', fc='%s']",
                ds, fl, ft, fill, fh, fc);
    }
}
