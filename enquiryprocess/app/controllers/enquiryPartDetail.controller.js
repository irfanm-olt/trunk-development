const Models = require("../models");
const Op = require('sequelize').Op;

const Manufacture = Models.manufactures;
const Part = Models.parts;
const EnquiryPartHeaders = Models.enquiryPartHeaders;
const EnquiryPartDetails = Models.enquiryPartDetails;

// CREATE ENQUIRY PART DETAILS
exports.create = (req, res) => {
	const postData = {
		PartheaderID: req.body.datas.partheaderID,
		Brand: req.body.datas.brand,
		CostPrice: req.body.datas.costPrice,
		SellingPrice: req.body.datas.salePrice,
		ProductNumber: req.body.datas.productNumber,
		Remark: req.body.datas.remark,
		Status: 1
	}

	EnquiryPartDetails.create(postData)
	.then(data => {
		return res.status(200).json({ data: data, success: true});
	})
};

//	READ ENQUIRY PART DETAILS
exports.read = (req, res) => {
	EnquiryPartDetails.findAll({ where: { PartheaderID: req.body.partheaderID } }).then(data => {
		if(data.length != 0) {
			return res.status(200).json({ data: data, success: true});
		}
	})
};

// LOAD ALL ENQUIRY PART DETAILS
exports.findAll = (req, res) => {
	EnquiryPartHeaders.findAll({
		where: { EnquiryID: req.body.enquiryID, PartNumber: { [Op.ne]: 'parentHeader' } },
		include:
			[
				{
					model: EnquiryPartDetails
				},
				{
					model: Part
				},
				{
					model: Manufacture
				}
			]
	}).then(data => {
		res.status(200).json({ data: data, success: true, module: 'Enquiry part details'});
	})
};