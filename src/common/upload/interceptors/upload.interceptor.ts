import { diskStorage } from "multer";
import { extname } from "path";

export const multerOptions = (folder: string) => ({

  storage: diskStorage({

    destination: `./uploads/${folder}`,

    filename: (req, file, cb) => {

      const unique =
        Date.now() + "-" + Math.round(Math.random() * 1e9);

      cb(null, unique + extname(file.originalname));

    },

  }),

  fileFilter: (req, file, cb) => {

    if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
      return cb(new Error("Only images allowed"), false);
    }

    cb(null, true);

  },

  limits: {
    fileSize: 5 * 1024 * 1024
  }

});