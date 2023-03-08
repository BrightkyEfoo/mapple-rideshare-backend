
export const MAdminVerif = (req,res,next)=>{
    const {userId} = req.body
    if(!userId){
        return res.status(401).json({msg : 'your user id is required'})
    }
    if(req.user.accessLevel <= 1){
        return res.status(401).json({msg : 'unauthorized 1'})
    }
    if(req.user.accessLevel === 2 && req.body.accessLevel > 1){
        return res.status(401).json({msg : 'unauthorized 2'})
    }
    next()
}