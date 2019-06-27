package com.sunlife.groupweb.member.MongoDBLayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/mfm")
public class RESTController {

    @Autowired // says field injection not reccomended, maybe create config class and move it there?
    private FormRepository repository;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<Form> getAllForms() {
        return repository.findAll();
    }

    @RequestMapping(value = "/{formId}", method = RequestMethod.GET)
    public List<Form> getFormByFormId(@PathVariable("formId") String formId) {
        // return repository.findByFormId(formId);
        // return a list of all forms that contain that formId
        return null;
    }

    @RequestMapping(value = "/{formId}", method = RequestMethod.PUT)
    public void modifyFormByFormId(@PathVariable("formId") String formId, @Valid @RequestBody FormDTO newFormDTO) {
        boolean exteriorChange = false;
        // Find original copy of form to compare
        List<Form> originalForm = repository.findByOneField("fl.fc", formId);
        // convert new form into a java form
        List<Form> editedForm = angularToJava(newFormDTO);
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
            for (int i = 0; i < newFormDTO.states.length; i++) {
                List<Form> newFormLocations = repository.findByThreeFields("ci", editedForm.get(0).ci, "ss", editedForm.get(0).ss,
                        "sc", newFormDTO.states[i]);
                for (Form thisForm : newFormLocations) {
                    ArrayList<subForm> thisSubForms = new ArrayList<>(Arrays.asList(thisForm.fl));
                    thisSubForms.add(newSubForm);
                    thisForm.fl = thisSubForms.toArray(new subForm[0]);
                    repository.save(thisForm);
                }
            }
        } else {
            // Check to see if list of states has been changed
            List<String> newStatesList = Arrays.asList(newFormDTO.states);
            List<String> oldStatesList = new ArrayList<>();
            List<String> statesDeleted = new ArrayList<>();
            // record list of added and deleted states
            for (Form thisForm : originalForm) {
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
            for (int i = 0; i < newStatesList.size(); i++) {
                List<Form> formsToUpdate = repository.findByThreeFields("ci", newFormDTO.coverageType,
                        "ss", newFormDTO.sourceSystem, "sc", newStatesList.get(i));
                replaceInFormList(formId, newSubForm, formsToUpdate);
            }
        }

    }

    @RequestMapping(value = "/submission-form", method = RequestMethod.POST)
    public void addSubForm(@Valid @RequestBody FormDTO form) {
        for (int i = 0; i < form.states.length; i++) {
            String state = form.states[i];
            List<Form> formsToBeAdded = repository.findByThreeFields("sc", state, "ss", form.sourceSystem, "ci", form.coverageType);
            for (Form f : formsToBeAdded) {        /*
                   Iterator stateIterator = formDTO.iterator();
                   for(Form f=null; stateIterator.hasNext(); f=(Form)stateIterator.next()) { */
                ArrayList<subForm> subFormPlusOne = new ArrayList<subForm>(Arrays.asList(f.fl));
                subForm newSub = new subForm(form.name, form.link, form.formType, false, form.description, form.formId);
                subFormPlusOne.add(newSub);
                f.fl = subFormPlusOne.toArray(new subForm[subFormPlusOne.size()]);
                repository.save(f);
            }
        }
    }

    @RequestMapping(value = "delete-form/{formId}", method = RequestMethod.DELETE)
    public void deleteSubForm(@PathVariable("formId") String formId) {
        List<Form> allTheForms = repository.findAll();
        for (Form f : allTheForms) {
            for (int i = 0; i < f.fl.length; i++) {
                if (f.fl[i].fc.equals(formId)) {
                    ArrayList<subForm> subFormMinusOne = new ArrayList<subForm>(Arrays.asList(f.fl));
                    subFormMinusOne.remove(i);
                    f.fl = subFormMinusOne.toArray(new subForm[subFormMinusOne.size()]);
                    repository.save(f);
                }
            }
        }
    }


    private void replaceInFormList(String formId, subForm newSubForm, List<Form> formList) {
        for (Form thisForm : formList) {
            List<subForm> thisSubForms = Arrays.asList(thisForm.fl);
            List<subForm> filteredSubForms = thisSubForms.stream().filter(s -> !s.fc.equals(formId)).collect(Collectors.toList());
            filteredSubForms.add(newSubForm);
            thisForm.fl = filteredSubForms.toArray(new subForm[0]);
            repository.save(thisForm);
        }
    }

    private void deleteFromFormList(String formId, List<Form> formList) {
        for (Form thisForm : formList) {
            List<subForm> thisSubForms = Arrays.asList(thisForm.fl);
            thisForm.fl = thisSubForms.stream().filter(s -> !s.fc.equals(formId)).toArray(subForm[]::new);
            repository.save(thisForm);
        }
    }

    private void deleteFromStates(String formId, List<String> statesDeleted) {
        // craft the search string for states
        for (int i = 0; i < statesDeleted.size(); i++) {
            List<Form> matchingForms = repository.findByTwoFields("'fl.fc'", formId, "sc", statesDeleted.get(i));
            deleteFromFormList(formId, matchingForms);
        }
    }

    private List<Form> angularToJava(FormDTO formDTO) {
        List<Form> javaForms = new ArrayList<>();
        for (int i = 0; i < formDTO.states.length; i++) {
            // return matching forms and take the first one
            List<Form> matchingForms = repository.findSingleForm(formDTO.coverageType, formDTO.sourceSystem, formDTO.states[i]);
            Form thisForm = matchingForms.get(0);
            // create a new subForm with data that was passed in
            subForm newSubForm = new subForm(formDTO.name, formDTO.link, formDTO.formType,true, formDTO.description, formDTO.formId);
            // add new subForm to existing fl list by converting to array and back
            ArrayList<subForm> tempSubList = new ArrayList<>(Arrays.asList(thisForm.fl));
            tempSubList.add(newSubForm);
            thisForm.fl = tempSubList.toArray(new subForm[0]); // apparently empty array is preferred and it will realloc correctly?
            javaForms.add(thisForm);
        }
        return javaForms;
    }

}



