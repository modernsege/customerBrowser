package com.company.customerbrowserapp.service;

import com.company.customerbrowserapp.exceptions.DoesNotExistException;
import com.company.customerbrowserapp.exceptions.EmailTakenException;
import com.company.customerbrowserapp.exceptions.InvalidDataException;
import com.company.customerbrowserapp.exceptions.NotEnoughCustomersException;
import com.company.customerbrowserapp.model.Customer;
import com.company.customerbrowserapp.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CustomerService {
    private CustomerRepository customerRepository;



    @Autowired
    public CustomerService(CustomerRepository customerRepositoryArg){
        customerRepository = customerRepositoryArg;
    }

    public Page<Customer> getCustomers(Map<String, String> params) {
        Pageable pagingType;
        Integer page = 0;
        Integer limit = 20;
        if(params.get("limit")!=null)
            limit = Integer.parseInt(params.get("limit"));

        if(params.get("page")!= null)
            page = Integer.parseInt(params.get("page"));

        pagingType = PageRequest.of(page, limit);

        return customerRepository.findAll(pagingType);
    }

    public Customer getCustomersById(Long id) throws DoesNotExistException {
        Optional<Customer> customer = customerRepository.findById(id);
        if (customer.isEmpty())
            throw new DoesNotExistException("Customer");
        else
            return customer.get();
    }

    public String deleteCustomer(Long id) throws DoesNotExistException  {
        Optional<Customer> customer = customerRepository.findById(id);
        if (customer.isEmpty())
            throw new DoesNotExistException("Customer");
        else{
            customerRepository.delete(customer.get());
            return "Customer ID: "+id+" deleted";
        }
    }

    public String postCustomers(Customer customer) throws EmailTakenException, InvalidDataException {
        Optional<Customer> customerTemp = customerRepository.findCustomerByEmail(customer.getEmail());
        if(customerTemp.isPresent()){
            throw new EmailTakenException(customer.getEmail());
        }
        else{
            if(Objects.equals(customer.getEmail(), "") || Objects.equals(customer.getFirstName(), "") || Objects.equals(customer.getLastName(), "")){
                throw new InvalidDataException();
            }
            customerRepository.save(customer);
            return  "Customer "+customer.getEmail() +" created successfully\n";
        }
    }
}
