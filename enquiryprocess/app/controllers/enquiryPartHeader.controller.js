const Models = require("../models");
const Manufacture = Models.manufactures;
const Part = Models.parts;
const EnquiryPartHeaders = Models.enquiryPartHeaders;

// CREATE ENQUIRY PART HEADERS
exports.create = (req, res) => {
	req.body.datas.formData.enquiryPartHeaders.map((item, index) => {
		const postData = {
			EnquiryID: req.body.datas.enquiryID,
			ParttypeID:1,
			PartID: item.partName,
			Quantity: item.quantity,
			PartNumber: "parentHeader",
			Status: 1,
		}
		EnquiryPartHeaders.create(postData)
		.then(data => {
			//return res.status(200).json({ data: data, success: true});
		})
	});
	return res.status(200).json({ data: {}, success: true});
};


// LOAD ENQUIRY PART HEADERS
exports.read = (req, res) => {
	EnquiryPartHeaders.findAll({
	  where: { EnquiryID: req.body.enquiryID },
	  include: [
	  	{
	    	model: Part
	   	},
	   	{
	   		model: Manufacture
	   	}
	   ]
	}).then(data => {
	  	res.status(200).json({ data: data, success: true, module: 'Part Header'});
	});
};


// UPDATE PART HEAERS
exports.addPartNumber = (req, res) => {
	EnquiryPartHeaders.findAll({ where: { EnquiryID:req.body.datas.enquiryID, ManufactureID: req.body.datas.manufacture, Quantity: req.body.datas.quantity, PartID: req.body.datas.partID } }).then(data => {
		if(data.length != 0) {
			return res.status(400).json({ data: "Data Exists" });
		}
		else
		{
			const postData = {
				EnquiryID: req.body.datas.enquiryID,
				ParttypeID:1,
				PartID: req.body.datas.partID,
				Quantity: req.body.datas.quantity,
				ManufactureID: req.body.datas.manufacture,
				PartNumber: req.body.datas.partNumber,
				Status: 1,
			}
			EnquiryPartHeaders.create(postData)
			.then(data => {
				const dataObj = data.get({plain:true})
				EnquiryPartHeaders.findAll({
				  where: { ID: dataObj.ID },
				  include: [
				  	{
				    	model: Part
				   	},
				   	{
				   		model: Manufacture
				   	}
				   ]
				}).then(data => {
				  res.status(200).json({ data: data, success: true, module: 'Part Header'});
				});
			})
		}
	})
};