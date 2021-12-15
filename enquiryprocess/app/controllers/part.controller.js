const paginate = require("jw-paginate");
const Models = require("../models");

const PartSection = Models.partSections;
const Part = Models.parts;

// CREATE PARTS
exports.create = (req, res) => {

	Part.findAll({ where: { PartsectionID: req.body.partSection, Name: req.body.partName }, raw: true }).then(data => {
		if(data.length != 0) {
			return res.status(400).json({ error: "Data Exists" });
		}else {	
			const postData = {
				PartsectionID: req.body.partSection,
				Name: req.body.partName,
				Status: 1
			}

			Part.create(postData)
			.then(data => {
				const dataObj = data.get({plain:true})
				Part.findAll({
				  where: { ID: dataObj.ID },
				  include: [{
				    model: PartSection
				   }]
				}).then(data => {
				  res.status(200).json({ data: data, success: true, module: 'Parts'});
				});
			})
		}
	})
};

// READ ALL PARTS
exports.findAll = (req, res) => {
	PartSection.findAll({
		include: [{
		   model: Part
		}]
	}).then(data => {
	  	 return res.status(200).json({ data: data, success: true, module: 'Parts'});
	});
};

// READ PARTS
exports.read = (req, res) => {

	Part.findAll({ order: [ ['ID', 'DESC'] ], include: [{ model: PartSection }]}).then(data => {
		const items = data;
		const page = parseInt(req.body.query.pages) || 1;
		const pageSize = 10;
    	const pager = paginate(items.length, page, pageSize);
    	const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    	return res.status(200).json({ data: pageOfItems, pager, success: true});
	});
};

// UPDATE PARTS
exports.update = (req, res) => {

	try {
	  const postData = {
	  	PartsectionID: req.body.datas.partSection,
	  	Name: req.body.datas.partName
	  }
	  Part.findAll({ where: { Name: postData.Name } }).then(data => {
	  	if(data.length == 0)
	  	{
	  		const data = Part.update(
			  	postData,
			    { where: { ID: req.body.datas.id } }
			)
			.then(result => {
				Part.findAll({ where: { ID: req.body.datas.id } }).then(data => {
					return res.status(200).json({ data: data, success: true, module: 'Update Part'});
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


// DELETE PARTS
exports.delete = (req, res) => {

	Part.destroy({where: { ID: req.body.id } })
    .then((data) => {
    	if (data>0) 
    	{
    		Part.findAll().then(data => {
    			res.status(200).json({ data: req.body.id, success: true, module: 'Part Deleted'});
    		});
    	}
    })
    .catch((err)=>{
	   res.status(400).json({ data: "Data not deleted!", success: false });
	})
};