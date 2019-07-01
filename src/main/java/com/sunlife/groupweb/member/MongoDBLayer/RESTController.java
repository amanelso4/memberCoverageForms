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

    private FormRepository repository;

    @Autowired // constructor injection instead of field injection
    public RESTController(FormRepository repository) {
        this.repository = repository;
    }

    /////////////////////
    //// GET METHODS ////
    /////////////////////

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "", method = RequestMethod.GET)
    public FormDTO[] translateAllFormsToFormDTOs() {
        //This method retrieves all forms from database and turn them into FormDTOs
        //This method also combines all duplicate
        List<Form> allTheForms = repository.findAll();
        ArrayList<String> formIds = new ArrayList<>();
        List<FormDTO> finalList = new ArrayList<>();
        for (Form f : allTheForms) {
            // populate formIds list with all unique formIds
            for (int i = 0; i < f.fl.length; i++) {
                if (!formIds.contains(f.fl[i].fc)) {
                    formIds.add(f.fl[i].fc);
                }
            }
        }
        for (String id : formIds) {
            finalList.add(createAngularForm(id, allTheForms));
        }
        return finalList.toArray(new FormDTO[0]);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/{formId}", method = RequestMethod.GET)
    public FormDTO getFormByFormId(@PathVariable("formId") String formId) {
        // return a the FormDTO that matches the FormId provided
        List<Form> allTheForms = repository.findByOneField("fl.fc", formId);
        return createAngularForm(formId, allTheForms);
    }

    ////////////////////
    //// PUT METHOD ////
    ////////////////////

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/{formId}", method = RequestMethod.PUT)
    public void modifyFormByFormId(@PathVariable("formId") String formId, @Valid @RequestBody FormDTO newFormDTO) {
        boolean exteriorChange = false;
        // Find original copy of form to compare
        List<Form> originalForm = repository.findByOneField("fl.fc", formId);
        /* TODO: Handle error where no matches found */
        // create new subForm to be used
        subForm newSubForm = new subForm(newFormDTO.name, newFormDTO.link, newFormDTO.formType, true, newFormDTO.description, newFormDTO.formId);
        // Check to see if exterior fields have been changed
        if (originalForm.get(0).ci.equals(newFormDTO.coverageType) || originalForm.get(0).ss.equals(newFormDTO.sourceSystem)) {
            exteriorChange = true;
        }
        // COV TYPE OR SOURCE SYSTEM CHANGED
        if (exteriorChange) {
            // Remove all instances of form from current doc
            deleteFromFormList(formId, originalForm);
            // find new locations based on changed exterior fields
            for (int i = 0; i < newFormDTO.state.length; i++) {
                List<Form> newFormLocations = repository.findByThreeFields("ci", newFormDTO.coverageType, "ss", newFormDTO.sourceSystem,
                        "sc", newFormDTO.state[i]);
                if (newFormLocations.size() == 0) {
                    // form location not found, need a new record
                    ArrayList<subForm> thisSubForms = new ArrayList<>();
                    thisSubForms.add(newSubForm);
                    Form newRecord = new Form(newFormDTO.coverageType, true, thisSubForms.toArray(new subForm[0]), newFormDTO.state[i], newFormDTO.sourceSystem);
                    repository.save(newRecord);
                } else {
                    for (Form thisForm : newFormLocations) {
                        ArrayList<subForm> thisSubForms = new ArrayList<>(Arrays.asList(thisForm.fl));
                        thisSubForms.add(newSubForm);
                        thisForm.fl = thisSubForms.toArray(new subForm[0]);
                        repository.save(thisForm);
                    }
                }
            }
        } else {
            // Check to see if list of states has been changed
            List<String> newStatesList = Arrays.asList(newFormDTO.state);
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
            for (String newState : newStatesList) {
                // find new locations
                List<Form> formsToUpdate = repository.findByThreeFields("ci", newFormDTO.coverageType,
                        "ss", newFormDTO.sourceSystem, "sc", newState);
                if (formsToUpdate.size() == 0) {
                    // record for that state not found, need new top-level document
                    ArrayList<subForm> thisSubForms = new ArrayList<>();
                    thisSubForms.add(newSubForm);
                    Form newRecord = new Form(newFormDTO.coverageType, true, thisSubForms.toArray(new subForm[0]), newState, newFormDTO.sourceSystem);
                    repository.save(newRecord);
                } else {
                    replaceInFormList(formId, newSubForm, formsToUpdate);
                }
            }
        }
    }

    /////////////////////
    //// POST METHOD ////
    /////////////////////

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "", method = RequestMethod.POST)
    public void addSubForm(@Valid @RequestBody FormDTO form) {
        subForm newSub = new subForm(form.name, form.link, form.formType, true, form.description, form.formId);
        for (int i = 0; i < form.state.length; i++) {
            String state = form.state[i];
            List<Form> formsToBeAdded = repository.findByThreeFields("sc", state, "ss", form.sourceSystem, "ci", form.coverageType);
            if (formsToBeAdded.size() == 0) {
                ArrayList<subForm> thisSubForms = new ArrayList<>();
                thisSubForms.add(newSub);
                Form newRecord = new Form(form.coverageType, true, thisSubForms.toArray(new subForm[0]), state, form.sourceSystem);
                repository.save(newRecord);
            } else {
                for (Form f : formsToBeAdded) {
                    ArrayList<subForm> subFormPlusOne = new ArrayList<>(Arrays.asList(f.fl));
                    subFormPlusOne.add(newSub);
                    f.fl = subFormPlusOne.toArray(new subForm[0]);
                    repository.save(f);
                }
            }
        }
    }

    /////////////////////
    /// DELETE METHOD ///
    /////////////////////

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/{formId}", method = RequestMethod.DELETE)
    public void deleteSubForm(@PathVariable("formId") String formId) {
        System.out.println("Deleting form w/ formId " + formId);
        List<Form> allTheForms = repository.findByOneField("fl.fc", formId);
        for (Form f : allTheForms) {
            for (int i = 0; i < f.fl.length; i++) {
                if (f.fl[i].fc.equals(formId)) {
                    ArrayList<subForm> subFormMinusOne = new ArrayList<>(Arrays.asList(f.fl));
                    subFormMinusOne.remove(i);
                    f.fl = subFormMinusOne.toArray(new subForm[0]);
                    repository.save(f);
                }
            }
        }
    }

    /////////////////////
    ////// HELPERS //////
    /////////////////////

    // Creates an angular form from a given formId and list of java forms
    // Used by: Both GETs
    private FormDTO createAngularForm(String formId, List<Form> allTheForms) {
        FormDTO newAngularForm = new FormDTO();
        ArrayList<String> states = new ArrayList<>();
        for (Form f : allTheForms) {
            for (int i = 0; i < f.fl.length; i++) {
                if (f.fl[i].fc.equals(formId)) {
                    newAngularForm.coverageType = f.ci;
                    newAngularForm.sourceSystem = f.ss;
                    newAngularForm.formType = f.fl[i].ft;
                    newAngularForm.name = f.fl[i].ds;
                    newAngularForm.link = f.fl[i].fl;
                    newAngularForm.description = f.fl[i].fh;
                    newAngularForm.formId = f.fl[i].fc;
                    if (!states.contains(f.sc)) {
                        states.add(f.sc);
                    }
                }
            }
        }
        newAngularForm.state = states.toArray(new String[0]);
        return newAngularForm;
    }

    // Used by: PUT
    private void replaceInFormList(String formId, subForm newSubForm, List<Form> formList) {
        for (Form thisForm : formList) {
            List<subForm> thisSubForms = Arrays.asList(thisForm.fl);
            List<subForm> filteredSubForms = thisSubForms.stream().filter(s -> !s.fc.equals(formId)).collect(Collectors.toList());
            filteredSubForms.add(newSubForm);
            thisForm.fl = filteredSubForms.toArray(new subForm[0]);
            repository.save(thisForm);
        }
    }

    // Used by: PUT
    private void deleteFromStates(String formId, List<String> statesDeleted) {
        // craft the search string for states
        for (String stateRemoved : statesDeleted) {
            List<Form> matchingForms = repository.findByTwoFields("'fl.fc'", formId, "sc", stateRemoved);
            deleteFromFormList(formId, matchingForms);
        }
    }

    // Deletes a form given its formId from the database using a given form list
    // Used by: PUT, DELETE
    private void deleteFromFormList(String formId, List<Form> formList) {
        for (Form thisForm : formList) {
            List<subForm> thisSubForms = Arrays.asList(thisForm.fl);
            thisForm.fl = thisSubForms.stream().filter(s -> !s.fc.equals(formId)).toArray(subForm[]::new);
            repository.save(thisForm);
        }
    }

}

