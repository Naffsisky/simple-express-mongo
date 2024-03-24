const adminModel = (mongoose) => {
  const schema = mongoose.Schema(
    {
      username: String,
      password: String,
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;

    return object;
  });

  return mongoose.model("admin", schema);
};

export default adminModel;
