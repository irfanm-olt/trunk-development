const paginate = require("jw-paginate");
const Models = require("../models");
const Manufacture = Models.manufactures;

// CREATE MANUFACTURE
exports.create = (req, res) => {

	Manufacture.findAll({ where: { Name: req.body.manufacture }, raw: true }).then(data => {
		if(data.length != 0) {
			return res.status(400).json({ error: "Data Exists" });
		}else {	
			const postData = {
				Name: req.body.manufacture,
				Status: 1
			}

			Manufacture.create(postData)
			.then(data => {
				return res.status(200).json({ data: data, success: true});
			})
		}
	})
};

// READ ALL MANUFACTURES
exports.findAll = (req, res) => {
    Manufacture.findAll().then(data => {
	  return res.status(200).json({ data, success: true, module: 'Manufacture'});
	});
};

// READ MANUFACTURE -> LIST MANUFACTURE 
exports.read = (req, res) => {
	Manufacture.findAll({raw: true, order: [ ['ID', 'DESC'] ]}).then(data => {
		const items = data;
		const page = parseInt(req.body.query.pages) || 1;
		const pageSize = 10;
    	const pager = paginate(items.length, page, pageSize);
    	const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    	return res.status(200).json({ data: pageOfItems, pager, success: true});
	});
};

// UPDATE MANUFACTURE
exports.update = (req, res) => {
	try {
	  const postData = {
	  	Name: req.body.datas.manufacture
	  }
	  Manufacture.findAll({ where: { Name: postData.Name } }).then(data => {
	  	if(data.length == 0)
	  	{
	  		const data = Manufacture.update(
			  	postData,
			    { where: { ID: req.body.datas.id } }
			)
			.then(result => {
				Manufacture.findAll({ where: { ID: req.body.datas.id } }).then(data => {
					return res.status(200).json({ data: data, success: true, module: 'Update Manufacture'});
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
	  return res.status(400).json({ error: "Update Manufacture" });
	}
};

// DELETE MANUFACTURE
exports.delete = (req, res) => {
	Manufacture.destroy({where: { ID: req.body.id } })
    .then((data) => {
    	if (data>0) 
    	{
    		Manufacture.findAll().then(data => {
    			res.status(200).json({ data: req.body.id, success: true, module: 'Manufacture Deleted'});
    		});
    	}
    })
    .catch((err)=>{
	   res.status(400).json({ data: "Data not deleted!", success: false });
	})
};