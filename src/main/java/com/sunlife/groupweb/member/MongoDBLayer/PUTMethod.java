package com.sunlife.groupweb.member.MongoDBLayer;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class PUTMethod {

    private FormRepository repository;

    public void doAPutPlease(String formId, FormDTO newFormDTO) {
        boolean coverageTypeChanged = false;
        boolean sourceSystemChanged = false;
        boolean exteriorChange = false;
        boolean statesDeleted = false;
        // Find original copy of form to compare
        List<Form> originalForm = repository.findByOneField("'fl.fc'", formId);
        // Convert original form into angular form for easier comparision
        FormTranslator formTranslator = new FormTranslator();
        List<Form> editedForm = formTranslator.angularToJava(newFormDTO);
        // Check to see if exterior fields have been changed
        if (originalForm.get(0).ci.equals(editedForm.get(0).ci) || originalForm.get(0).ss.equals(editedForm.get(0).ss)) {
            exteriorChange = true;
        }
        // Check to see if list of states has been changed
        List<String> statesList = Arrays.asList(newFormDTO.states);
        for ( Form thisForm : originalForm ) {
            if (!statesList.contains(thisForm.sc)) {
                statesDeleted = true;
            }
        }
        // COV TYPE OR SOURCE SYSTEM CHANGED
        if (exteriorChange) {
            // Remove all instances of form from current doc
            for (Form thisForm : originalForm) {
                List<subForm> thisSubForms = Arrays.asList(thisForm.fl);
                thisForm.fl = thisSubForms.stream().filter(s -> !s.fc.equals(formId)).toArray(subForm[]::new);
                repository.save(thisForm);
            }
            // craft the search string for states
            String stateSearch = "{ $in : { '";
            for (int i = 0; i < (newFormDTO.states.length - 1); i++) {
                stateSearch = stateSearch + newFormDTO.states[i] + "', '";
            }
            stateSearch = stateSearch + newFormDTO.states[newFormDTO.states.length - 1] + "' ] }";
            // replace originalForm with the new location for the subForms
            List<Form> newFormLocations = repository.findByThreeFields("ci", editedForm.get(0).ci, "ss", editedForm.get(0).ss,
                    "sc", stateSearch);
            // create new subForm to be added
            subForm newSubForm = new subForm(newFormDTO.name, newFormDTO.link, newFormDTO.formType, true, newFormDTO.description, newFormDTO.formId);
            // add new subForm to all new form locations
            for (Form thisForm: newFormLocations) {
                List<subForm> thisSubForms = Arrays.asList(thisForm.fl);
                thisSubForms.add(newSubForm);
                thisForm.fl = thisSubForms.toArray(new subForm[0]);
                repository.save(thisForm);
            }
        }
    }

}
