export default function BoardModel(mongoose){
    const boardSchema = mongoose.Schema(
        {   title : String,
            content : String
        }, {timestamps: true}
    )
    return mongoose.model('Board', boardSchema)
}