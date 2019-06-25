/*package com.sunlife.groupweb.member.MongoDBLayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    public Form addSubForm(@Valid @RequestBody Form form) {
        // convert Form form into appropriate formatting
        // add to documents based on state-coverageType-source combo
    }

    @RequestMapping(value = "/{formId}", method = RequestMethod.DELETE)
    public void deleteSubForm(@PathVariable("formId") String formId)
    {
        // remove all subforms that contain that formId
    }
}*/
