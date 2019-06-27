/*
package com.sunlife.groupweb.member.MongoDBLayer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class HttpMethods {

    private FormRepository repository;

    public void post(FormDTO form) {
        for (int i=0; i<form.states.length; i++)
        {
            String state = form.states[i];
            List<Form> formsToBeAdded = repository.findByThreeFields("sc", state, "ss", form.sourceSystem, "ci", form.coverageType);
            for(Form f : formsToBeAdded)
            {        */
/*
                   Iterator stateIterator = formDTO.iterator();
                   for(Form f=null; stateIterator.hasNext(); f=(Form)stateIterator.next()) { *//*

                ArrayList<subForm> subFormPlusOne=  new ArrayList<subForm>(Arrays.asList(f.fl));
                subForm newSub = new subForm(form.name, form.link, form.formType, false, form.description, form.formId);
                subFormPlusOne.add(newSub);
                f.fl = subFormPlusOne.toArray(new subForm[subFormPlusOne.size()]);
                repository.save(f);
            }
        }
    }

    public void delete(String formId) {
        List<Form> allTheForms = repository.findAll();
        for(Form f: allTheForms)
        {
            for(int i = 0; i<f.fl.length; i++)
            {
                if(f.fl[i].fc.equals(formId))
                {
                    ArrayList<subForm> subFormMinusOne= new ArrayList<subForm>(Arrays.asList(f.fl));
                    subFormMinusOne.remove(i);
                    f.fl = subFormMinusOne.toArray(new subForm[subFormMinusOne.size()]);
                    repository.save(f);
                }
            }
        }
    }

    private void replaceInFormList(String formId, subForm newSubForm, List<Form> formList) {
        for ( Form thisForm: formList ) {
            List<subForm> thisSubForms = Arrays.asList(thisForm.fl);
            List<subForm> filteredSubForms = thisSubForms.stream().filter(s -> !s.fc.equals(formId)).collect(Collectors.toList());
            filteredSubForms.add(newSubForm);
            thisForm.fl = filteredSubForms.toArray(new subForm[0]);
            repository.save(thisForm);
        }
    }
    private void deleteFromFormList(String formId, List<Form> formList) {
        for ( Form thisForm : formList ) {
            List<subForm> thisSubForms = Arrays.asList(thisForm.fl);
            thisForm.fl = thisSubForms.stream().filter(s -> !s.fc.equals(formId)).toArray(subForm[]::new);
            repository.save(thisForm);
        }
    }

    private void deleteFromStates(String formId, List<String> statesDeleted) {
        // craft the search string for states
        String stateSearch = createStateSearch(statesDeleted);
        List<Form> matchingForms = repository.findByTwoFields("'fl.fc'", formId, "sc", stateSearch);
        deleteFromFormList(formId, matchingForms);
    }

    private String createStateSearch(List<String> states) {
        String stateSearch = "{ $in : { '";
        for (int i = 0; i < (states.size() - 1); i++) {
            stateSearch = stateSearch + states.get(i) + "', '";
        }
        stateSearch = stateSearch + states.get(states.size() - 1) + "' ] }";
        return stateSearch;
    }

    public void put(String formId, FormDTO newFormDTO) {
        boolean exteriorChange = false;
        // Find original copy of form to compare
        List<Form> originalForm = repository.findByOneField("'fl.fc'", formId);
        // convert new form into a java form
        FormTranslator formTranslator = new FormTranslator();
        List<Form> editedForm = formTranslator.angularToJava(newFormDTO);
        // create new subForm to be used
        subForm newSubForm = new subForm(newFormDTO.name, newFormDTO.link, newFormDTO.formType, true, newFormDTO.description, newFormDTO.formId);
        // Check to see if exterior fields have been changed
        if (originalForm.get(0).ci.equals(editedForm.get(0).ci) || originalForm.get(0).ss.equals(editedForm.get(0).ss)) {
            exteriorChange = true;
        }
        // COV TYPE OR SOURCE SYSTEM CHANGED
        if (exteriorChange) {
            // Remove all instances of form from current doc
            deleteFromFormList(formId, originalForm);
            // craft the search string for states
            String stateSearch = createStateSearch(Arrays.asList(newFormDTO.states));
            // replace originalForm with the new location for the subForms
            List<Form> newFormLocations = repository.findByThreeFields("ci", editedForm.get(0).ci, "ss", editedForm.get(0).ss,
                    "sc", stateSearch);
            // add new subForm to all new form locations
            for (Form thisForm: newFormLocations) {
                List<subForm> thisSubForms = Arrays.asList(thisForm.fl);
                thisSubForms.add(newSubForm);
                thisForm.fl = thisSubForms.toArray(new subForm[0]);
                repository.save(thisForm);
            }
        } else {
            // Check to see if list of states has been changed
            List<String> newStatesList = Arrays.asList(newFormDTO.states);
            List<String> oldStatesList = new  ArrayList<String>();
            List<String> statesDeleted = new ArrayList<String>();
            // record list of added and deleted states
            for ( Form thisForm : originalForm ) {
                if (!oldStatesList.contains(thisForm.sc)) {
                    oldStatesList.add(thisForm.sc);
                }
                if (!newStatesList.contains(thisForm.sc) && !statesDeleted.contains(thisForm.sc)) {
                    statesDeleted.add(thisForm.sc);
                }
            }
            // if necessary, delete from removed states
            if (!statesDeleted.isEmpty()) {
                deleteFromStates(formId, statesDeleted);
            }
            // add/edit in new list of states
            String stateSearch = createStateSearch(newStatesList);
            List<Form> formsToUpdate = repository.findByThreeFields("ci", newFormDTO.coverageType,
                    "ss", newFormDTO.sourceSystem, "sc", stateSearch);
            replaceInFormList(formId, newSubForm, formsToUpdate);
        }
    }
}
*/
