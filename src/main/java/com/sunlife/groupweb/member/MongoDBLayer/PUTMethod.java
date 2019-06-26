package com.sunlife.groupweb.member.MongoDBLayer;

import java.util.List;

public class PUTMethod {

    private FormRepository repository;

    public void doAPutPlease(String formId, FormDTO newFormDTO) {
        boolean stateChange = false;
        boolean exteriorChange = false;
        boolean interiorChange = false;
        // Find original copy of form to compare
        List<Form> originalForm = repository.findByOneField("'fl.fc'", formId);
        // Convert new form into database
        FormTranslator formTranslator = new FormTranslator();
        List<Form> newForm = formTranslator.angularToJava(newFormDTO);
        if (originalForm.get(0).ci != newForm.get(0).ci || originalForm.get(0).ss != newForm.get(0).ss) {
            exteriorChange = true;
        }
    }

}
