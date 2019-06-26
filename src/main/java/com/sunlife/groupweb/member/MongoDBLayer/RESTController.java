package com.sunlife.groupweb.member.MongoDBLayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/mfm")
public class RESTController {

    @Autowired
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
    public void modifyFormByFormId(@PathVariable("formId") String formId, @Valid @RequestBody Form form) {
        // find current version of form by formId
        // convert Form form into appropriate formatting
        // determine what fields have been changed
        // make the appropriate modifications to the form
    }

    @RequestMapping(value = "/submission-form", method = RequestMethod.POST)
    public void addSubForm(@Valid @RequestBody FormDTO form) {
        // convert Form form into appropriate formatting
       /* Iterate through the form's states, coverageTypes, and ss and for each found  from the database then add subForm to state, ss,
       and coverageType combination
        */
       for (int i=0; i<form.states.length; i++)
       {
           String state = form.states[i];
           List<Form> formsToBeAdded = repository.findByThreeFields("sc", state, "ss", form.sourceSystem, "ci", form.coverageType);
           for(Form f : formsToBeAdded)
           {        /*
                   Iterator stateIterator = formDTO.iterator();
                   for(Form f=null; stateIterator.hasNext(); f=(Form)stateIterator.next()) { */
               ArrayList<subForm>subFormPlusOne=  (ArrayList<subForm>)Arrays.asList(f.fl);
               subForm newSub = new subForm(form.name, form.link, form.formType, false, form.description, form.formId);
               subFormPlusOne.add(newSub);
               f.fl = (subForm[])subFormPlusOne.toArray();
               repository.save(f);
           }
       }
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public void deleteSubForm(@Valid @RequestBody FormDTO form)
    {

        // remove all subforms that contain that formId
        for (int i=0; i<form.states.length; i++)
        {
            String state = form.states[i];
            List<Form> formToBeDeleted = repository.findByThreeFields("sc", state, "ss", form.sourceSystem, "ci", form.coverageType);
            for(Form f : formToBeDeleted)
            {
                ArrayList<subForm> subFormMinusOne=  (ArrayList<subForm>)Arrays.asList(f.fl);
                subForm newSub = new subForm(form.name, form.link, form.formType, true, form.description, form.formId);
                subFormMinusOne.remove(newSub);
                f.fl = (subForm[])subFormMinusOne.toArray();
                repository.save(f);

            }
        }
    }


}
