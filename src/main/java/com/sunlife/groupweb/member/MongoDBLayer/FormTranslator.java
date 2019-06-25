package com.sunlife.groupweb.member.MongoDBLayer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

// translates between angular forms and database forms
public class FormTranslator {

    private FormRepository repository;

    public List<Form> angularToJava(FormDTO formDTO) {
        List<Form> javaForms = new ArrayList<>();
        for (int i = 0; i < formDTO.states.length; i++) {
            // return matching forms and take the first one
            List<Form> arrayForm = repository.findSingleForm(formDTO.coverageType, formDTO.sourceSystem, formDTO.states[i]);
            Form thisForm = arrayForm.get(0);
            // create a new subForm with data that was passed in
            subForm newSubForm = new subForm(formDTO.name, formDTO.link, formDTO.formType,true, formDTO.description, formDTO.formId);
            // add new subForm to existing fl list by converting to array and back
            List<subForm> tempSubList = Arrays.asList(thisForm.fl);
            tempSubList.add(newSubForm);
            thisForm.fl = tempSubList.toArray(new subForm[0]); // apparently empty array is preferred and it will realloc correctly?
            javaForms.add(thisForm);
        }
        return javaForms;
    }

    /*public List<FormDTO> javaToAngular(List<Form> javaForms) {

    }*/
}
