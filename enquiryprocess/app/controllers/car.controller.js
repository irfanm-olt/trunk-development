const paginate = require("jw-paginate");
const Models = require("../models");
// Initialize databse
const Manufacture = Models.manufactures;
const Cars = Models.cars;

// CREATE CAR
exports.create = (req, res) => {
	
	Cars.findAll({ where: { ManufactureID: req.body.manufacture, CarName: req.body.carName }, raw: true }).then(data => {
		//console.log(data);
		if(data.length != 0) {
			return res.status(400).json({ error: "Data Exists" });
		}else {	
			const postData = {
				ManufactureID: req.body.manufacture,
				CarName: req.body.carName,
				Status: 1
			}

			Cars.create(postData)
			.then(data => {
				const dataObj = data.get({plain:true})
				Cars.findAll({
				  where: { ID: dataObj.ID },
				  include: [{
				    model: Manufacture
				   }]
				}).then(data => {
				  res.status(200).json({ data: data, success: true, module: 'Cars'});
				});
			})
		}
	})
};

// READ ALL CAR RECORDS 
exports.findAll = (req, res) => {
	Cars.findAll({
		include: [{
		   model: Manufacture
		}]
	}).then(data => {
	  	 return res.status(200).json({ data: data, success: true, module: 'Parts'});
	});
};

// READ CARS -> LIST CARS
exports.read = (req, res) => {
	Cars.findAll({ order: [ ['ID', 'DESC'] ], include: [{ model: Manufacture }]}).then(data => {
		const items = data;
		const page = parseInt(req.body.query.pages) || 1;
		const pageSize = 10;
    	const pager = paginate(items.length, page, pageSize);
    	const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    	return res.status(200).json({ data: pageOfItems, pager, success: true});
	});
};

// UPDATE CAR
exports.update = (req, res) => {
	try {
	  const postData = {
	  	ManufactureID: req.body.datas.manufacture,
	  	CarName: req.body.datas.carName
	  }
	  Cars.findAll({ where: { CarName: postData.CarName } }).then(data => {
	  	if(data.length == 0)
	  	{
	  		const data = Cars.update(
			  	postData,
			    { where: { ID: req.body.datas.id } }
			)
			.then(result => {
				Cars.findAll({ where: { ID: req.body.datas.id } }).then(data => {
					return res.status(200).json({ data: data, success: true, module: 'Update Car'});
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
		console.log(err);
	  return res.status(400).json({ error: "Update Car" });
	}
};

// DELETE CAR
exports.delete = (req, res) => {
	Cars.destroy({where: { ID: req.body.id } })
    .then((data) => {
    	if (data>0) 
    	{
    		Cars.findAll().then(data => {
    			res.status(200).json({ data: req.body.id, success: true, module: 'Car Deleted'});
    		});
    	}
    })
    .catch((err)=>{
	   res.status(400).json({ data: "Data not deleted!", success: false });
	})
};

