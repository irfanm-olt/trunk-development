const paginate = require("jw-paginate");
const Models = require("../models");

const Manufacture = Models.manufactures;
const Cars = Models.cars;
const Customer = Models.customer;
const EnquiryCarDetails = Models.enquiryCarDetails;
const EnquiryPartHeaders = Models.enquiryPartHeaders;

// CREATE ENQUIRY CAR DETAILS
exports.create = (req, res) => {
	Manufacture.findAll({ where: { Name: req.body.manufacture }, raw: true }).then(data => {
		if(data.length != 0) {
			const manufactureID = data[0].ID;
			Cars.findAll({ where: { ManufactureID: manufactureID, CarName: req.body.carName }, raw: true }).then(data => {
				if(data.length != 0) {
					const carID = data[0].ID;
					const ManufactureID = data[0].ManufactureID;
					const postData = {
						CustomerID: req.body.customer,
						ChassisNO: req.body.chassisNumber,
						ManufactureID: ManufactureID,
						CarID: carID,
						Year: req.body.modelYear,
						Variant: req.body.variant,
						Status: 1
					}
					// create enquiry
					EnquiryCarDetails.create(postData)
					.then(data => {
						return res.status(200).json({ data: data, success: true});
					});

				} else {
					const postData = {
						ManufactureID: manufactureID,
						CarName: req.body.carName,
						Status: 1
					}
					Cars.create(postData)
					.then(data => {
						const dataObj = data.get({plain:true});
						const carID = dataObj.ID;
						const manufactureID = dataObj.ManufactureID;
						// inser to enquiry car detail
						const postData = {
							CustomerID: req.body.customer,
							ChassisNO: req.body.chassisNumber,
							ManufactureID: manufactureID,
							CarID: carID,
							Year: req.body.modelYear,
							Variant: req.body.variant,
							Status: 1
						}
						EnquiryCarDetails.create(postData)
						.then(data => {
							return res.status(200).json({ data: data, success: true});
						});
					});
				}
			})
		} else {	

			const postData = {
				Name: req.body.manufacture,
				Status: 1
			}

			Manufacture.create(postData)
			.then(data => {
				const dataObj = data.get({plain:true});
				const manufactureID = dataObj.ID;

					Cars.findAll({ where: { ManufactureID: manufactureID, CarName: req.body.carName }, raw: true }).then(data => {
					if(data.length != 0) {
						const carID = data[0].ID;
						const manufactureID = data[0].ManufactureID;
						const postData = {
							CustomerID: req.body.customer,
							ChassisNO: req.body.chassisNumber,
							ManufactureID: manufactureID,
							CarID: carID,
							Year: req.body.modelYear,
							Variant: req.body.variant,
							Status: 1
						}
						// create enquiry
						EnquiryCarDetails.create(postData)
						.then(data => {
							return res.status(200).json({ data: data, success: true});
						});

					} else {
						const postData = {
							ManufactureID: manufactureID,
							CarName: req.body.carName,
							Status: 1
						}
						Cars.create(postData)
						.then(data => {
							const dataObj = data.get({plain:true});
							const carID = dataObj.ID;
							const manufactureID = dataObj.ManufactureID;
							// inser to enquiry car detail
							const postData = {
								CustomerID: req.body.customer,
								ChassisNO: req.body.chassisNumber,
								ManufactureID: manufactureID,
								CarID: req.body.carID,
								Year: req.body.modelYear,
								Variant: req.body.variant,
								Status: 1
							}
							// create enquiry
							EnquiryCarDetails.create(postData)
							.then(data => {
								return res.status(200).json({ data: data, success: true});
							});
						});
					}
				})

			})
		}
	})
};

// READ ENQUIRY WITH PARTHEADERS
exports.findPartheaders = (req, res) => {
//router.get("/loadEnquiry", (req, res) => {
	EnquiryCarDetails.findAll({
		include: 
		[
			{
			   	model: EnquiryPartHeaders
			},
		]
	}).then(data => {
	  	 return res.status(200).json({ data: data, success: true, module: 'Enquiries'});
	});
};

// READ ALL ENQUIRY CAR DETAILS
exports.findAll = (req, res) => {
	EnquiryCarDetails.findAll({
	  include:
	  	[
		  	{
		    	model: Customer
		   	},
		   	{
		   		model: Cars
		   	},
		   	{
		   		model: Manufacture
		   	},
		   	{
		   		model: EnquiryPartHeaders
		   	},
	   ]
	}).then(data => {
	  res.status(200).json({ data: data, success: true, module: 'Enquiry Car'});
	});
};

// READ MANUFACTURE BY ID
exports.findById = (req, res) => {
	EnquiryCarDetails.findAll({ where: { ID: req.body.enquiryID }, raw: true }).then(data => {
		if(data.length != 0 )
		{
			const carID = data[0].CarID;
			Cars.findAll({ 
				where: { ID: carID },
				include: [
					{
						model: Manufacture
					}
				]
			}).then(data => {
				return res.status(200).json({ data: data, success: true});
			})
		}
	})
};

// READ ENQUIRY CAR DETAILS -> LIST
exports.read = (req, res) => {
	EnquiryCarDetails.findAll({ order: [ ['ID', 'DESC'] ], include: [ { model: Customer }, { model: Cars }, { model: Manufacture }, { model: EnquiryPartHeaders } ]}).then(data => {
		const items = data;
		const page = parseInt(req.body.query.pages) || 1;
		const pageSize = 10;
    	const pager = paginate(items.length, page, pageSize);
    	const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    	return res.status(200).json({ data: pageOfItems, pager, success: true});
	});
};


