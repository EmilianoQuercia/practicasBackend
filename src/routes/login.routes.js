import { Router } from "express";
import registroModel from "../models/registro.model.js";

const router = Router();


router.get('/', (req, res) => {
    res.render('login', {});
})

router.get('/user', async (req, res) => {
    const {email, password} = req.query
    console.log('User',{email, password})
    try {
        const result = await registroModel.findOne({email: email, password: password})
        console.log('result', result)
        if (result){
          req.session.user = email
          req.session.admin = true
          console.log('admin ',req.session.admin)
          return res.send('success')
        }else{
            res.send('error')
        }

        
    } catch (error) {
        res.status(500).send({error: error});
    }
    
});
const auth = async (req, res, next) => {
    console.log('auth', req.session.user)
    if (await req.session?.admin){
        return next()
    }else{
        return res.status(401).send('error de autenticaion')
    }
}


router.get('/perfil', auth, async (req,res)=>{
    if (await req.session?.admin){
        console.log('entre')
        res.render('perfil',{}) 
    }
})

export default router