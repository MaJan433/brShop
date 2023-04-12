import { Router, Request, Response} from "express";
import {DatabaseFunctions} from "./repository";
import {createHmac} from "crypto";

type userAndPassword = {
    uuid: string,
    user: string,
    password: string
}


export class MainRouter {
    public readonly router: Router = Router()

    constructor() {
        this.router = Router()
        this.createRoutes()
    }

    private createRoutes() {
        this.router
            .get('/orders', this.getOrders)
            .post('/search', this.searchItem)
            .patch('/items', this.updateItem)
            .delete('/items/:uuid', this.deleteItem)
            .post('/items/add', this.addItem)
            .get('/basket', this.getBasket)
            .get('/items', this.getItems)
            .post('/check/Hash', this.adminLogging)
            .post('/addOrder', this.addOrder)
            .post('/User', this.addUser)
            .get('/User', this.getUsers)
            .post('/User/login',this.loginUser)
    }
    private async loginUser(req: Request, res: Response){
        const loggingUser: string = req.body.user
        const loggingPassword: string = req.body.password
        const activeUsers = await DatabaseFunctions.get_users() as userAndPassword[]
        activeUsers.forEach(user => {
            if (loggingUser === user.user){
                if (loggingPassword === user.password){
                    console.log('ta')
                    res.status(200).end()
                    return;
                }
            }});
        res.status(203).end()
    }

    private async getUsers(req: Request, res: Response) {
        const answer = await DatabaseFunctions.get_users()
        res.json(answer)
        return answer
    }

    private async getOrders(req: Request, res: Response) {
        const answer = await DatabaseFunctions.get_orders()
        res.json(answer)
    }
    private async addUser(req: Request, res: Response) {
        const activeUsers = await DatabaseFunctions.get_users() as userAndPassword[]
        let userAlreadyExists = false
        activeUsers.forEach(user => {
            if (req.body.user === user.user){
                userAlreadyExists = true
                return;
            };
        });
        if (userAlreadyExists){
            res.status(203).end()
            return;
        };
        const user = req.body.user
        const password = req.body.password
        const passwordContainsBigLetter: Boolean = /[A-Z]/.test(password)
        const passwordContainsSpecialCharacter: Boolean = /[!@#$%&*()_+=|<>?{}\[\]~-]/.test(password)
        const requirements = [user.length>5, password.length>5, user!=='', password!=='', passwordContainsBigLetter,passwordContainsSpecialCharacter]
        if (requirements.some(requirement => !requirement)){
            res.status(206).end()
            return;
        }
        const userObject = req.body;
        await DatabaseFunctions.add_user(userObject);
        res.status(200)
        res.end()
    }
    private async searchItem(req: Request, res: Response) {
        console.log('received', req.body)
        const {search, minPrice, maxPrice} = req.body
        const answer = await DatabaseFunctions.item_finder(search, minPrice, maxPrice)
        if (req.body.category && req.body.category !== "Remove categories"){
            // @ts-ignore
            const filteredAnswer =  answer.filter(object => {
                if (object.cat == req.body.category){
                    return object
                }
            });
            console.log(filteredAnswer)
            res.json(filteredAnswer)
        } else {
            res.json(answer)
        }

    }
    private async updateItem(req: Request, res: Response) {
        await DatabaseFunctions.update_product(req.body)
        res.end()
    }
    private async deleteItem(req: Request, res: Response) {
        await DatabaseFunctions.remove_product(req.params.uuid)
        res.end()
    }
    private async addItem(req: Request, res: Response) {
        console.log('works')
        await DatabaseFunctions.add_new_product(req.body)
        res.end()
    }
    private async getBasket(req: Request, res: Response) {
        const result = await DatabaseFunctions.show_basket()
        res.json(result)
    }
    private async getItems(req: Request, res: Response) {
        const result = await DatabaseFunctions.select_all()
        res.json(result)
    }
    private async adminLogging(req: Request, res: Response) {
        //password ----> 'SafeBrowserShop1'
        const SALT = 'juasdhiuoasidh&^jhdfijuhsd;uoiyN8aysud* HFASDIUFSADH IUPDSAH*&hgajshdg78608lks'
        const hash = createHmac('sha512', SALT)
            .update(req.body.password)
            .digest('hex');
        const requiredHash: any = await DatabaseFunctions.get_admin_hash()
        if (requiredHash[0].password === hash) {
            res.status(200)
        } else {
            res.status(400);
        }
        res.end()
    }
    private async addOrder(req: Request, res: Response) {
        console.log(req.body, 'to jest body')
        console.log(req.body.orders)
        console.log(Object.entries(req.body.orders))
        const orders = Object.entries(req.body.orders)
        const user = req.body.user
        const location = req.body.location
        const promises = orders.map((arr: any, i) => {
            return DatabaseFunctions.insert_order(
                arr[0],
                arr[1].amount,
                arr[1].price,
                user,
                location)
        })
        await Promise.all(promises)
        res.end()
    }
}
