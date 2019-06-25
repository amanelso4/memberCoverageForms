package com.sunlife.groupweb.member.MongoDBLayer;

public class subForm {

    public String ds;
    public String fl;
    public String ft;
    public boolean fill;
    public String fh;
    public String fc;

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
                "subForm[ds='%s', fl='%s', ft='%s', fill=%s, fh='&s', fc='%s']",
                ds, fl, ft, fill, fh, fc);
    }
}
