package com.sunlife.groupweb.member.MongoDBLayer;

public class FormDTO {

    public String coverageType;
    public String[] states;
    public char sourceSystem;
    public String formType;
    public String name;
    public String link;
    public String description;
    public String formId;

    public FormDTO(String coverageType, String[] states, char sourceSystem, String formType, String name, String link, String description, String formId) {
        this.coverageType = coverageType;
        this.states = states;
        this.sourceSystem = sourceSystem;
        this.formType = formType;
        this.name = name;
        this.link = link;
        this.description = description;
        this.formId = formId;
    }

}
