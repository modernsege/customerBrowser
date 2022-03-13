package com.company.customerbrowserapp.controller;

import com.company.customerbrowserapp.exceptions.DoesNotExistException;
import com.company.customerbrowserapp.exceptions.EmailTakenException;
import com.company.customerbrowserapp.exceptions.InvalidDataException;
import com.company.customerbrowserapp.exceptions.NotEnoughCustomersException;
import com.company.customerbrowserapp.model.Customer;
import com.company.customerbrowserapp.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "api/v1/customers")
public class CustomerController {
    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerServiceArg){
        customerService = customerServiceArg;
    }

    @GetMapping
    public ResponseEntity<?> getAllUsers(@RequestParam Map<String, String> params) {
        try {
            return new ResponseEntity<Page<Customer>>(customerService.getCustomers(params), HttpStatus.OK);
        }
        catch (Exception exception){
            System.out.println(exception);
            return new ResponseEntity<String>("It shouldn't occur", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable Long id){
        try {
            return new ResponseEntity<Customer>(customerService.getCustomersById(id), HttpStatus.OK);
        }
        catch (Exception exception){
            System.out.println(exception);
            if(exception.getClass() == DoesNotExistException.class)
                return new ResponseEntity<String>("Customer with provided id does not exist", HttpStatus.NOT_FOUND);
            else{
                return new ResponseEntity<String>("It shouldn't occur", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long id) {
        try {
            return new ResponseEntity<String>(customerService.deleteCustomer(id), HttpStatus.OK);
        }
        catch (Exception exception){
            System.out.println(exception);
            if(exception.getClass() == DoesNotExistException.class)
                return new ResponseEntity<String>("Customer with provided id does not exist", HttpStatus.NOT_FOUND);
            else{
                return new ResponseEntity<String>("It shouldn't occur", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @PostMapping
    public ResponseEntity<?> postCustomer(@RequestBody Customer customer){
        try{
            return new ResponseEntity<String>(customerService.postCustomers(customer), HttpStatus.OK);
        }
        catch (Exception exception){
            if(exception.getClass()== InvalidDataException.class){
                return new ResponseEntity<String>("Provided data is invalid or you did not enter required fields.", HttpStatus.NOT_ACCEPTABLE);
            }
            else if(exception.getClass()== EmailTakenException.class){
                return new ResponseEntity<String>("Provided email already exists.", HttpStatus.NOT_ACCEPTABLE);
            }
            else{
                return new ResponseEntity<String>("It shouldn't occur", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

}
