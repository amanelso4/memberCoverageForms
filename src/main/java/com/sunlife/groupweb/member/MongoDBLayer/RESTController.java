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

  //  private HttpMethods http;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<Form> getAllForms() {
        return repository.findAll();
    }

    @RequestMapping(value = "/{formId}", method = RequestMethod.GET)
    public FormDTO getFormByFormId(@PathVariable("formId") String formId)
    {
        // return repository.findByFormId(formId);
        // return a list of all forms that contain that formId
        List<Form> allTheForms = repository.findAll();
        FormDTO fillForm = new FormDTO();
        for (Form f : allTheForms) {
            String[] States = new String[fillForm.states.length+1];
            for (int i = 0; i < f.fl.length; i++) {
                if (f.fl[i].fc.equals(formId))
                {
                    fillForm.coverageType = f.ci;
                    fillForm.sourceSystem = f.ss;
                    fillForm.formType = f.fl[i].ft;
                    fillForm.name = f.fl[i].ds;
                    fillForm.link = f.fl[i].fl;
                    fillForm.description = f.fl[i].fh;
                    fillForm.formId = f.fl[i].fc;
                    for(int j = 0; j<States.length; j++)
                    {
                        if(j == States.length)
                        {
                            States[j] = f.sc;
                        }
                        States[j] = fillForm.states[j];
                    }
                }
                fillForm.states = States;
            }
        }
        return fillForm;
    }


    @RequestMapping(value = "/{formId}", method = RequestMethod.PUT)
    public void modifyFormByFormId(@PathVariable("formId") String formId, @Valid @RequestBody FormDTO form) {
        // find current version of form by formId
        // convert Form form into appropriate formatting
        // determine what fields have been changed
        // make the appropriate modifications to the form
   //     http.put(formId, form);
    }

    @RequestMapping(value = "/submission-form", method = RequestMethod.POST)
    public void addSubForm(@Valid @RequestBody FormDTO form)
    {
    //    http.post(form);
      /* for (int i=0; i<form.states.length; i++)
       {
           String state = form.states[i];
           List<Form> formsToBeAdded = repository.findByThreeFields("sc", state, "ss", form.sourceSystem, "ci", form.coverageType);
           for(Form f : formsToBeAdded)
           {        *//*
                   Iterator stateIterator = formDTO.iterator();
                   for(Form f=null; stateIterator.hasNext(); f=(Form)stateIterator.next()) { *//*
               ArrayList<subForm> subFormPlusOne=  new ArrayList<subForm>(Arrays.asList(f.fl));
               subForm newSub = new subForm(form.name, form.link, form.formType, false, form.description, form.formId);
               subFormPlusOne.add(newSub);
               f.fl = subFormPlusOne.toArray(new subForm[subFormPlusOne.size()]);
            repository.save(f);
           }
       }*/
    }

    @RequestMapping(value = "delete-form/{formId}", method = RequestMethod.DELETE)
    public void deleteSubForm(@PathVariable("formId") String formId)
    {
      //  http.delete(formId);
       /* List<Form> allTheForms = repository.findAll();
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
        }*/
    }



}



