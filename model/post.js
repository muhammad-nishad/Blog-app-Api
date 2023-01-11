const mongoose=require('mongoose')

const PostSchema=new mongoose.Schema(
    {
        userid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        delete: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
        },
        likes: {
            type: Array,
            default: [],
        },
        comments: [
            {
                comment: {
                    type: String
                },
                commentBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                commentDelete: {
                    type: Boolean,
                    default: false
                },
                commentAt: {
                    type:Date,
                    default: new Date()
                },
            },
        ],
        report: [
            {

                report: {
                    type: String

                },
                reportedBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'

                },
                createdAt: {
                    type: String,
                    default: new Date().toDateString()
                },
            }
        ],
        reportedStatus: {
            type: Boolean,
            default: false,

        },

    },
    {
        timestamps:true
    }
)
module.exports=mongoose.model("post",PostSchema)