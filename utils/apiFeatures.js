class ApiFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    filter() {
      let queryObj = { ...this.queryString };
      const excludedFields = ["author"];
      excludedFields.forEach((field) => delete queryObj[field]);
      let queryString = JSON.stringify(queryObj);
      queryString = queryString.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
       // Convert string values to numbers when necessary
       for (const key in queryObj) {
        if (!isNaN(queryObj[key])) {
          queryObj[key] = +queryObj[key];
        }
      }
       this.query.find(queryObj);
      return this;
    }
  
    sort() {
      if (this.queryString.sort) {
        let sortBy = this.queryString.sort.split(",").join(" ");
        this.query = this.query.sort(sortBy);
      }else{
        this.query = this.query.sort("-createdAt");
      }
      return this;
    }
  
    paginate() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page - 1) * limit;
      console.log(page, limit, skip)
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  }


  export default ApiFeatures;