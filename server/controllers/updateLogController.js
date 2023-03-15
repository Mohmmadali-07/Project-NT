const Crud = require("../models/updateLogmodel");

// Display All CRUD Data
const crud_index = (req, res) => {
	const id = req.query.id
	Crud.find(function (err, cruds) {
		let result =[]
		for (let i = 0; i < cruds.length; i++) {
			const currentObject = cruds[i];
			const reqid = currentObject.result.id;
			if (reqid == id) {
			  result.push(currentObject);
			} 
		}
		console.log(result);
		res.json(result)
	});
};

// Create New CRUD
const crud_create_post = (req, res) => {

	const crudData = {
		
		result: req.body
	  };
	  
	  let updateLog = new Crud(crudData);
	
	updateLog
		.save()
		.then((updateLog) => {
			res.send(updateLog);
		})
		.catch(function (err) {
			res.status(422).send("Crud add failed");
		});
};

// Show a particular CRUD Detail by Id
const crud_details = (req, res) => {
	Crud.findById(req.params.id, function (err, crud) {
		if (!crud) {
			res.status(404).send("No result found");
		} else {
			res.json(crud);
		}
	});
};

// Update CRUD Detail by Id
const crud_update = (req, res) => {
	Crud.findByIdAndUpdate(req.params.id, req.body)
		.then(function () {
			res.json("Crud updated");
		})
		.catch(function (err) {
			res.status(422).send("Crud update failed.");
		});
};

// Delete CRUD Detail by Id
const crud_delete = (req, res) => {
	Crud.findById(req.params.id, function (err, crud) {
		if (!crud) {
			res.status(404).send("Crud not found");
		} else {
			Crud.findByIdAndRemove(req.params.id)
				.then(function () {
					res.status(200).json("Crud deleted");
				})
				.catch(function (err) {
					res.status(400).send("Crud delete failed.");
				});
		}
	});
};

module.exports = {
	crud_index,
	crud_details,
	crud_create_post,
	crud_update,
	crud_delete,
};
