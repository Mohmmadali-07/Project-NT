const express = require("express");
const router = express.Router();
const crudController = require("../controllers/expenseController");
const multer = require('multer');


const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, './uploads');
      },
      filename(req, file, cb) {
        cb(null, `${new Date().getTime()}_${file.originalname}`);
      }
    }),
    limits: {
      fileSize: 10000000 // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx)$/)) {
        return cb(
          new Error(
            'only upload files with jpg, jpeg, png, pdf, doc, docx format.'
          )
        );
      }
      cb(undefined, true); // continue with upload
    }
  });

router.get("/", crudController.crud_index);
router.post("/",upload.single('image'), crudController.crud_create_post);
router.get("/:id", crudController.crud_details);
router.patch("/:id",upload.single('image'), crudController.crud_update);
router.delete("/:id", crudController.crud_delete);

module.exports = router;
