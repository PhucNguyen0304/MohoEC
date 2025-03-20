import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cart: [
        {
            _id: { type: String, required: true },
            color: { type: String, required: true },
            quanlity: { type: Number, required: true }
        }
    ],
    purchase: [
        {
            products: [
                    {   _id: { type: String, required: true},
                        color:{type:String,require:true},
                        quanlity:{type:Number,require:true},
                        review: {type:String}
                    }
            ],
            status: {type: String, required: true },
            track: {type: String, required: true },
            idPay: {type: String, required: true  },
            totalAmount: {type: Number, required: true},
            address:{type: String, required: true},
            numberPhone:{type: String, required: true},
            note: {type: String, required: true},
            payMethod: {type: String, required: true}
        } 
    ]
}, { timestamps: true }); // Add timestamps option

const userModel = mongoose.models.users || mongoose.model('users', userSchema);
export default userModel;