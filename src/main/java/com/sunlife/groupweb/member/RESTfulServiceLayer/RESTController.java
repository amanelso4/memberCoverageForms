package com.sunlife.groupweb.member.RESTfulServiceLayer;

import com.sunlife.groupweb.member.databaseLayer.FormRepository;
import com.sunlife.groupweb.member.models.Form;
import com.sunlife.groupweb.member.models.FormDTO;
import com.sunlife.groupweb.member.models.LoginDetails;
import com.sunlife.groupweb.member.models.SubForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api")
public class RESTController {

    private FormRepository repository;

    @Autowired // constructor injection instead of field injection
    public RESTController(FormRepository repository) {
        this.repository = repository;
    }

    //////////////////////
    //// LOGIN METHOD ////
    //////////////////////

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public boolean login(@Valid @RequestBody LoginDetails login) {
        String username = "admin";
        String password = "sunlife";
        return (login.getUsername().equals(username) && login.getPassword().equals(password));
    }

    /////////////////////
    //// GET METHODS ////
    /////////////////////

    @RequestMapping(value = "", method = RequestMethod.GET)
    public FormDTO[] translateAllFormsToFormDTOs() {
        //This method retrieves all forms from database and turn them into FormDTOs
        //This method also combines all duplicates
        List<Form> allTheForms = repository.findAll();
        ArrayList<String> formNumbers = new ArrayList<>();
        List<FormDTO> finalList = new ArrayList<>();
        for (Form f : allTheForms) {
            // populate formNumbers list with all unique formNumbers
            for (int i = 0; i < f.fl.length; i++) {
                if (!formNumbers.contains(f.fl[i].fc)) {
                    formNumbers.add(f.fl[i].fc);
                }
            }
        }
        for (String number : formNumbers) {
            finalList.add(createAngularForm(number, allTheForms));
        }
        return finalList.toArray(new FormDTO[0]);
    }

    @RequestMapping(value = "/{formNumber}", method = RequestMethod.GET)
    public FormDTO getFormByFormNumber(@PathVariable("formNumber") String formNumber) {
        // return a the FormDTO that matches the formNumber provided
        List<Form> allTheForms = repository.findByOneField("fl.fc", formNumber);
        return createAngularForm(formNumber, allTheForms);
    }

    /*@RequestMapping(value="/login", method = RequestMethod.GET)
    public String getLoginDetails() {
        return username + " " + password;
    }*/

    ////////////////////
    //// PUT METHOD ////
    ////////////////////

    @RequestMapping(value = "/{formNumber}", method = RequestMethod.PUT)
    public void modifyFormByFormNumber(@PathVariable("formNumber") String formNumber, @Valid @RequestBody FormDTO newFormDTO) {
        boolean exteriorChange = false;
        // Find original copy of form to compare
        List<Form> originalForm = repository.findByOneField("fl.fc", formNumber);
        // create new SubForm to be used
        SubForm newSubForm = new SubForm(newFormDTO.name, newFormDTO.link, newFormDTO.formType, true, newFormDTO.description, newFormDTO.formNumber);
        // Check to see if exterior fields have been changed
        if (originalForm.get(0).ci.equals(newFormDTO.coverageType) || originalForm.get(0).ss.equals(newFormDTO.sourceSystem)) {
            exteriorChange = true;
        }
        // COV TYPE OR SOURCE SYSTEM CHANGED
        if (exteriorChange) {
            // Remove all instances of form from current doc
            deleteFromFormList(formNumber, originalForm);
            // find new locations based on changed exterior fields
            for (int i = 0; i < newFormDTO.state.length; i++) {
                List<Form> newFormLocations = repository.findByThreeFields("ci", newFormDTO.coverageType, "ss", newFormDTO.sourceSystem,
                        "sc", newFormDTO.state[i]);
                if (newFormLocations.size() == 0) {
                    // form location not found, need a new record
                    ArrayList<SubForm> thisSubForms = new ArrayList<>();
                    thisSubForms.add(newSubForm);
                    Form newRecord = new Form(newFormDTO.coverageType, true, thisSubForms.toArray(new SubForm[0]), newFormDTO.state[i], newFormDTO.sourceSystem);
                    repository.save(newRecord);
                } else {
                    addToFormList(newSubForm, newFormLocations);
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
                for (String stateRemoved : statesDeleted) {
                    List<Form> matchingForms = repository.findByTwoFields("fl.fc", formNumber, "sc", stateRemoved);
                    deleteFromFormList(formNumber, matchingForms);
                }
            }
            // add/edit in new list of states
            for (String newState : newStatesList) {
                // find new locations
                List<Form> formsToUpdate = repository.findByThreeFields("ci", newFormDTO.coverageType,
                        "ss", newFormDTO.sourceSystem, "sc", newState);
                if (formsToUpdate.size() == 0) {
                    // record for that state not found, need new top-level document
                    ArrayList<SubForm> thisSubForms = new ArrayList<>();
                    thisSubForms.add(newSubForm);
                    Form newRecord = new Form(newFormDTO.coverageType, true, thisSubForms.toArray(new SubForm[0]), newState, newFormDTO.sourceSystem);
                    repository.save(newRecord);
                } else {
                    replaceInFormList(formNumber, newSubForm, formsToUpdate);
                }
            }
        }
    }

    /////////////////////
    //// POST METHOD ////
    /////////////////////

    @RequestMapping(value = "", method = RequestMethod.POST)
    public void addSubForm(@Valid @RequestBody FormDTO form) {
        SubForm newSub = new SubForm(form.name, form.link, form.formType, true, form.description, form.formNumber);
        for (int i = 0; i < form.state.length; i++) {
            String state = form.state[i];
            List<Form> formsToBeAdded = repository.findByThreeFields("sc", state, "ss", form.sourceSystem, "ci", form.coverageType);
            if (formsToBeAdded.size() == 0) {
                ArrayList<SubForm> thisSubForms = new ArrayList<>();
                thisSubForms.add(newSub);
                Form newRecord = new Form(form.coverageType, true, thisSubForms.toArray(new SubForm[0]), state, form.sourceSystem);
                repository.save(newRecord);
            } else {
                addToFormList(newSub, formsToBeAdded);
            }
        }
    }

    /////////////////////
    /// DELETE METHOD ///
    /////////////////////

    @RequestMapping(value = "/{formNumber}", method = RequestMethod.DELETE)
    public void deleteSubForm(@PathVariable("formNumber") String formNumber) {
        System.out.println("Deleting form w/ formNumber " + formNumber);
        List<Form> allTheForms = repository.findByOneField("fl.fc", formNumber);
        for (Form f : allTheForms) {
            if (f.fl.length == 1) {
                // only one subform, whole document can be removed
                repository.delete(f);
            }
            else {
                for (int i = 0; i < f.fl.length; i++) {
                    if (f.fl[i].fc.equals(formNumber)) {
                        ArrayList<SubForm> subFormMinusOne = new ArrayList<>(Arrays.asList(f.fl));
                        subFormMinusOne.remove(i);
                        f.fl = subFormMinusOne.toArray(new SubForm[0]);
                        repository.save(f);
                        break;
                    }
                }
            }
        }
    }

    /////////////////////
    ////// HELPERS //////
    /////////////////////

    // Creates an angular form from a given formNumber and list of java forms
    // Used by: Both GETs
    private FormDTO createAngularForm(String formNumber, List<Form> allTheForms) {
        FormDTO newAngularForm = new FormDTO();
        ArrayList<String> states = new ArrayList<>();
        for (Form f : allTheForms) {
            for (int i = 0; i < f.fl.length; i++) {
                if (f.fl[i].fc.equals(formNumber)) {
                    newAngularForm.coverageType = f.ci;
                    newAngularForm.sourceSystem = f.ss;
                    newAngularForm.formType = f.fl[i].ft;
                    newAngularForm.name = f.fl[i].ds;
                    newAngularForm.link = f.fl[i].fl;
                    newAngularForm.description = f.fl[i].fh;
                    newAngularForm.formNumber = f.fl[i].fc;
                    if (!states.contains(f.sc)) {
                        states.add(f.sc);
                    }
                }
            }
        }
        newAngularForm.state = states.toArray(new String[0]);
        return newAngularForm;
    }

    // Adds a given SubForm to all entries in a formList
    // Used by: PUT, POST
    private void addToFormList(SubForm newSubForm, List<Form> formList) {
        for (Form thisForm : formList) {
            ArrayList<SubForm> thisSubForms = new ArrayList<>(Arrays.asList(thisForm.fl));
            thisSubForms.add(newSubForm);
            thisForm.fl = thisSubForms.toArray(new SubForm[0]);
            repository.save(thisForm);
        }
    }

    // Used by: PUT
    private void replaceInFormList(String formNumber, SubForm newSubForm, List<Form> formList) {
        for (Form thisForm : formList) {
            List<SubForm> thisSubForms = Arrays.asList(thisForm.fl);
            List<SubForm> filteredSubForms = thisSubForms.stream().filter(s -> !s.fc.equals(formNumber)).collect(Collectors.toList());
            filteredSubForms.add(newSubForm);
            thisForm.fl = filteredSubForms.toArray(new SubForm[0]);
            repository.save(thisForm);
        }
    }

    // Deletes a form given its formNumber from the database using a given form list
    // Used by: PUT, DELETE
    private void deleteFromFormList(String formNumber, List<Form> formList) {
        for (Form thisForm : formList) {
            List<SubForm> thisSubForms = Arrays.asList(thisForm.fl);
            thisForm.fl = thisSubForms.stream().filter(s -> !s.fc.equals(formNumber)).toArray(SubForm[]::new);
            repository.save(thisForm);
        }
    }

}

