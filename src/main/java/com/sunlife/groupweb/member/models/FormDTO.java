package com.sunlife.groupweb.member.models;

// Form Data Transfer Object
// format in which forms are retrieved from/sent to the angular frontend
public class FormDTO {

    public String coverageType;
    public String[] state;
    public String sourceSystem;
    public String formType;
    public String name;
    public String link;
    public String description;
    public String formId;

    public FormDTO(String coverageType, String[] states, String sourceSystem, String formType, String name, String link, String description, String formId) {
        this.coverageType = coverageType;
        this.state = states;
        this.sourceSystem = sourceSystem;
        this.formType = formType;
        this.name = name;
        this.link = link;
        this.description = description;
        this.formId = formId;
    }

    public FormDTO() { }
}
