const Crud = require("../models/expenseModel");
const multer = require("multer");

// Display All CRUD Data
const crud_index = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 99999;
  const company = req.query.company || "true";

  try {
    const cruds = await Crud.find();
    var results = [];
    let totalBalance = 0;
    let balanceK = 0;
    let balanceN = 0;
    for (let i = 0; i < cruds.length; i++) {
      const currentObject = cruds[i];
      const companyValue = currentObject.newExpense.company;

      if (company === "true" && companyValue === true) {
        balanceN = currentObject.newExpense.balance;
        results.push(currentObject);
      } else if (company === "false" && companyValue === false) {
        balanceK = currentObject.newExpense.balance;
        results.push(currentObject);
      }
    }
  


    if (company === "true") {
      totalBalance = balanceN;
    } else {
      totalBalance = balanceK;
    }
    const count = results.length;
    const totalPages = Math.ceil(count / limit);
    const paginatedResults = results.slice((page - 1) * limit, page * limit);

    res.json({
      cruds: paginatedResults,
      totalPages,
      count,
      totalBalance,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create New CRUD
const crud_create_post = (req, res) => {
  const {
    company,
    date,
    description,
    type,
    credit,
    debit,
    balance,
    category,
    subCategory,
    remarks,
    givenBy,
    source,
    paid,
  } = JSON.parse(req.body.newExpense);
  if (req.file) {
    const parts = req.file.mimetype.split("/");
    var imageType = parts[0];
    var extension = parts[1];
  } else {
    var imageType = null;
    var extension = null;
  }

  const crud = new Crud({
    image: req.file ? req.file : undefined,
    
    newExpense: {
      company,
      date,
      description,
      type,
      credit,
      debit,
      balance,
      category,
      subCategory,
      remarks,
      givenBy,
      source,
      paid,
      imageType,
      extension,
    },
    
  });

  crud
    .save()
    .then((crud) => {
      res.status(200).send(crud);
    })
    .catch((err) => {
      console.error(err);
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
const crud_update = async (req, res) => {
  let change = false;
  let newExpense = JSON.parse(req.body.newExpense);
  let initialExpense = JSON.parse(req.body.initialExpense);
  const company = initialExpense.company
  

  

  const image = req.file ? req.file : JSON.parse(req.body.image);

let initialCredit =initialExpense.credit
let initialDebit =initialExpense.debit
let initialType =initialExpense.type
let initialBalance = initialExpense.balance;

  const id = req.body.id;
  

  
  if (initialType === newExpense.type) {
    if (Number(initialCredit) != Number(newExpense.credit)) {
      if (Number(initialCredit) > Number(newExpense.credit)) {
        newExpense.balance =
          Number(newExpense.balance) -
          (Number(initialCredit) - Number(newExpense.credit));
        change = true;
      } else {
        newExpense.balance =
          Number(newExpense.balance) +
          (Number(newExpense.credit) - Number(initialCredit));
        change = true;
      }
    } else if (
      Number(initialDebit) != Number(newExpense.debit)
    ) {
      if (Number(initialDebit) > Number(newExpense.debit)) {
        newExpense.balance =
          Number(newExpense.balance) +
          (Number(initialDebit) - Number(newExpense.debit));
        change = true;
      } else {
        newExpense.balance =
          Number(newExpense.balance) -
          (Number(newExpense.debit) - Number(initialDebit));
        change = true;
      }
    } else if (
      Number(initialDebit) == Number(newExpense.debit) &&
      Number(initialCredit) == Number(newExpense.credit)
    ) {
      change = false;
    }
  } else {
    if (
      initialType == "income" &&
      newExpense.type == "expense"
    ) {
      newExpense.balance =
        Number(newExpense.balance) -
        Number(initialCredit) -
        Number(newExpense.debit);
      change = true;
    } else {
      newExpense.balance =
        Number(newExpense.balance) +
        Number(initialDebit) +
        Number(newExpense.credit);
      change = true;
    }
  }
  const cruds = await Crud.find();
    var results = [];
    
    for (let i = 0; i < cruds.length; i++) {
      const currentObject = cruds[i];
      const companyValue = currentObject.newExpense.company;

      if (company === true && companyValue === true) {
        results.push(currentObject);
      } else if (company === false && companyValue === false) {
        results.push(currentObject);
      }
    }


  for (let i = 0; i < results.length; i++) {
    if (results[i]._id == id) {
      var index = i;
      break;
    }
  }
  results[index].newExpense.balance = Number(newExpense.balance);
  results[index].newExpense.date = newExpense.date;
  results[index].newExpense.description = newExpense.description;
  results[index].newExpense.category = newExpense.category;
  results[index].newExpense.subCategory = newExpense.subCategory;
  results[index].newExpense.givenBy = newExpense.givenBy;
  results[index].newExpense.imageType = newExpense.imageType;
  results[index].newExpense.extension = newExpense.extension;

  results[index].image = image
  
  if (change) {
    results[index].newExpense.credit = Number(newExpense.credit);
    results[index].newExpense.debit = Number(newExpense.debit);

    if (initialBalance > newExpense.balance) {
      const diff = initialBalance - newExpense.balance;
      for (let i = index + 1; i < results.length; i++) {
        console.log("decrease");

        results[i].newExpense.balance = results[i].newExpense.balance- diff;
      }
    } else if (initialBalance < newExpense.balance) {
      const diff = newExpense.balance - initialBalance;

      for (let i = index + 1; i < results.length; i++) {
        console.log("increase");

        results[i].newExpense.balance = results[i].newExpense.balance+ diff;
      }
    }
  }


 

  Promise.all(
    results.slice(index).map((result) => {
      return Crud.findByIdAndUpdate(result._id, result);
    })
  )
    .then(() => {
      res.json("Crud updated").status(200);
    })
    .catch((err) => {
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
