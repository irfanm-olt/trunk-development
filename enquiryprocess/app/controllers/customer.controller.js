const paginate = require("jw-paginate");
const Models = require("../models");
const Customer = Models.customer;

//	CREATE CUSTOMER
exports.create = (req, res) => {
	const data = {};
	Customer.findAll({ where: { CompanyPhone: req.body.companyPhone } }).then(customer => {
		if (customer.length != 0) {
		  return res.status(400).json({ Account: "Account already exists with this phone number" });
		} else {
		  const newCustomer = {
			CompanyName: req.body.companyName,
			ContactpersonFirstname: req.body.contactPersonFirstname,
			ContactpersonLastname: req.body.contactPersonLastname,
			ContactpersonMobile: req.body.contactPersonMobile,
			ContactpersonEmail: req.body.contactPersonEmail,
			CompanyPhone: req.body.companyPhone,
			Emirates: req.body.emirates,
			BuildingNumber: req.body.buildingNumber,
			Street: req.body.street,
			Address: req.body.address,
			ProfileImage: req.body.profileImage,
			Status: 1
		  };
  
		  Customer.create(newCustomer)
			  .then(data => {
				res.status(200).json({data: data, success: true});
			  })
			  .catch(err => {
				  res.status(500).send({
					message:
					  err.message || "Some error occurred."
				  });
				});
  
		}
	  });
  
 };


// READ ALL CUSTOMER RECORDS
exports.findAll = (req, res) => {

    Customer.findAll().then(customer => {
		if (customer.length == 0) {
			return res.status(400).json({ customer: "No record found!" });
		} else {
			res.status(200).json({ data: customer, success: true});
		}
	});

};

// READ CUSTOMERS -> LIST CUSTOMERS
exports.read = (req, res) => {

	Customer.findAll({raw: true, order: [ ['ID', 'DESC'] ]}).then(data => {
		const items = data;
		const page = parseInt(req.body.query.pages) || 1;
		const pageSize = 10;
    	const pager = paginate(items.length, page, pageSize);
    	const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    	return res.status(200).json({ data: pageOfItems, pager, success: true});
	});

};


// DELETE CUSTOMER
exports.delete = (req, res) => {

	Customer.destroy({where: { ID: req.body.id } })
    .then((data) => {
    	if (data>0) 
    	{
    		Customer.findAll().then(data => {
    			res.status(200).json({ data: req.body.id, success: true, module: 'Customer Deleted'});
    		});
    	}
    })
    .catch((err)=>{
	   res.status(400).json({ data: "Data not deleted!", success: false });
	})
};