
export const MSubAdminVerif = (req,res,next)=>{
    const {userId} = req.body
    if(!userId){
        return res.status(401).json({msg : 'your user id is required'})
    }
    if(req.user.accessLevel <= 1){
        return res.status(401).json({msg : 'unauthorized 1'})
    }
    // if()
    next()
}