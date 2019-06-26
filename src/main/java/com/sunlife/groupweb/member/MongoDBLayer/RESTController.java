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
    }

    @RequestMapping(value = "/{formId}", method = RequestMethod.PUT)
    public void modifyFormByFormId(@PathVariable("formId") String formId, @Valid @RequestBody Form form) {
        // find current version of form by formId
        // convert Form form into appropriate formatting
        // determine what fields have been changed
        // make the appropriate modifications to the form
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public Form addSubForm(@Valid @RequestBody FormDTO form) {
        // convert Form form into appropriate formatting
       /* Iterate through the form's states, coverageTypes, and ss and for each found  from the database then add subForm to state, ss,
       and coverageType combination
        */
       for (int i=0; i<form.states.length; i++) {

           String state = form.states[i];
           List formDTO = repository.findByThreeFields("sc", state, "ss", form.sourceSystem, "ci", form.coverageType);
           Iterator stateIterator = formDTO.iterator();

           for(Form f=null; stateIterator.hasNext(); f=(Form)stateIterator.next()) {

               ArrayList<subForm>subFormPlusOne=  (ArrayList<subForm>)Arrays.asList(f.fl);
               subForm newSub = new subForm(form.name, form.link, form.formType, false, form.description, form.formId);
               subFormPlusOne.add(newSub);
               f.fl = (subForm[])subFormPlusOne.toArray();
               repository.save(f);
           }
       }









        // add to documents based on state-coverageType-source combo

        repository.findByThreeFields("sc", states, "ss", sourceSystem, "ci", coverageType);
        repository.save(new subForm());

    }

    @RequestMapping(value = "/{formId}", method = RequestMethod.DELETE)
    public void deleteSubForm(@PathVariable("formId") String formId)
    {
        // remove all subforms that contain that formId
    }
}
