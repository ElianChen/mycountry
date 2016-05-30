module.exports = { 
	user:{ 
		name:{type:String,required:true},
		password:{type:String,required:true},
		salt:{type:String,required:true},
		hash:{type:String,required:true}

	}
};