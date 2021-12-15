const express = require("express");
const paginate = require("jw-paginate");
const Models = require("../models");

const PartSection = Models.partSections;

// CREATE PART SECTION
exports.create = (req, res) => {

	PartSection.findAll({ where: { Name: req.body.sectionName }, raw: true }).then(data => {
		//console.log(data);
		if(data.length != 0) {
			return res.status(400).json({ error: "Data Exists" });
		}else {	
			const postData = {
				Name: req.body.sectionName,
				Status: 1
			}

			PartSection.create(postData)
			.then(data => {
				return res.status(200).json({ data: data, success: true});
			})
		}
	})
};


// READ PART SECTION WITH PARTS
exports.findPartSectionwithParts = (req, res) => {
	PartSection.findAll({
		include: [{
		   model: Part
		}]
	}).then(data => {
	  	 return res.status(200).json({ data: data, success: true, module: 'Parts'});
	});
};

// READ ALL PART SECTION
exports.findAll = (req, res) => {

    PartSection.findAll({raw: true}).then(data => {
	  return res.status(200).json({ data: data, success: true, module: 'Part Section'});
	});

};

// READ PART SECTION -> LIST
exports.read = (req, res) => {

	PartSection.findAll({raw: true, order: [ ['ID', 'DESC'] ]}).then(data => {
		const items = data;
		const page = parseInt(req.body.query.pages) || 1;
		const pageSize = 10;
    	const pager = paginate(items.length, page, pageSize);
    	const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    	return res.status(200).json({ data: pageOfItems, pager, success: true});
	});

};


// UPDATE PART SECTION
exports.update = (req, res) => {
	try {
	  const postData = {
	  	Name: req.body.datas.sectionName
	  }
	  PartSection.findAll({ where: { Name: postData.Name } }).then(data => {
	  	if(data.length == 0)
	  	{
	  		const data = PartSection.update(
			  	postData,
			    { where: { ID: req.body.datas.id } }
			)
			.then(result => {
				PartSection.findAll({ where: { ID: req.body.datas.id } }).then(data => {
					return res.status(200).json({ data: data, success: true, module: 'Update Part Section'});
				});
			})
		   .catch(err => {
		   		return res.status(400).json({ error:err });
		   })
	  	 	
	  	 	
	  	}
	  	else
	  	{
	  		return res.status(400).json({ error: "Data Exists!" });
	  	}
	  })
	} catch (err) {
	  return res.status(400).json({ error: "Update Part Section" });
	}
};


// DELETE PART SECTION
exports.delete = (req, res) => {
	PartSection.destroy({where: { ID: req.body.id } })
    .then((data) => {
    	if (data>0) 
    	{
    		PartSection.findAll().then(data => {
    			res.status(200).json({ data: req.body.id, success: true, module: 'Part Section Deleted'});
    		});
    	}
    })
    .catch((err)=>{
	   res.status(400).json({ data: "Data not deleted!", success: false });
	})
};
