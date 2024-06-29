import bcrypt from 'bcrypt';
import UserRepo from './user.repo.js';
import { ApplicationError } from '../../error-handler/errorHandler.js';
export default class UserController{
    constructor(){
        this.userRepo = new UserRepo()
    }
    async signup(req, res){
        try {
            let  {name,email,password,gender}= req.body;
            // Basic validation
            if (!name || !email || !password || !gender) {
                return res.status(400).json({ message: 'All fields are required.' });
            }
            const hashedPassword = await bcrypt.hash(password,10)
            const userToRegister= {
                name,
                email,
                password:hashedPassword,
                gender
            }
            console.log(userToRegister)
            const newUser = await this.userRepo.register(userToRegister)
             // Send a successful response
             return res.status(201).json({
                message: 'User registered successfully',
                newUser
            });
           
        } catch (error) {
            console.error(error);
            throw new ApplicationError("Registeration failed at controller level!")
        }
    }
}