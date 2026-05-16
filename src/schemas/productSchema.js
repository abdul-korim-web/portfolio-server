import mongoose from "mongoose";

const productSchemas = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true
    },

    shortDescription: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    tech: [
      {
        name: {
          type: String,
          required: true
        },

        icon: {
          type: String,
          required: true
        }
      }
    ],

    liveLink: {
      type: String,
      required: true
    },

    githubLink: {
      type: String,
      required: true
    },
    topProject:{
      type:Boolean,
      required:true,
      default:false
    }
  },
  {
    timestamps: true
  }
);

const projectModal =
  mongoose.models.project ||
  mongoose.model("project", productSchemas);

export default projectModal;