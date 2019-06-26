package com.sunlife.groupweb.member.MongoDBLayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import static org.apache.catalina.security.SecurityUtil.remove;

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
    public void addSubForm(@Valid @RequestBody FormDTO form)
    //Passes a FormDTO in from Angular and cycles through the database based on state(s), coverageType, and sourceSystem to find the Forms it needs to modify,
    //then adds a new subForm to the Forms found from find
    {
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

    @RequestMapping(value = "/{formId}", method = RequestMethod.DELETE)
    public void deleteSubForm(@PathVariable("formId") String formId)
    //Passes a FormDTO in from Angular and cycles through database based on state(s), coverageType, and sourceSystem to find the Forms it needs to modify,
    //then it deletes the subForm(s) that have the same formId, link, formType, name, and description as the FormDTO passed in
    {
        List<Form> allTheForms = repository.findAll();
        for(Form f: allTheForms)
        {
            for(int i = 0; i<f.fl.length; i++)
            {
                if(f.fl[i].fc == formId)
                {
                    remove(f.fl[i]);
                }
                repository.save(f);
            }
        }
    }



}



