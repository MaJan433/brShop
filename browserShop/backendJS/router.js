
const {createHmac} = require("crypto");
const {DatabaseFunctions} = require("./repository");
const express = require("express");

const mainRouter = express()

mainRouter

            .get('/orders', async (req,res)=>{
                const answer = await DatabaseFunctions.get_orders();
                res.json(answer);
            })
            .post('/search', async (req,res)=> {
                const {search, minPrice, maxPrice} = req.body;
                const answer = await DatabaseFunctions.item_finder(search, minPrice, maxPrice);
                if (req.body.category && req.body.category !== 'Remove categories') {
                    const filteredAnswer = answer.filter((object) => {
                        if (object.cat == req.body.category) {
                            return object;
                        }
                    })
                    console.log(filteredAnswer);
                    res.json(filteredAnswer);
                } else {
                    res.json(answer);
                }
            })

            .patch('/items', async (req,res)=> {
                await DatabaseFunctions.update_product(req.body);
                res.end();
            })
            .delete('/items/:uuid', async (req,res)=> {
                await DatabaseFunctions.remove_product(req.params.uuid)
                res.end()
            })
            .post('/items/add', async (req,res)=> {
                await DatabaseFunctions.add_new_product(req.body)
                res.end()
            })
            .get('/basket', async (req,res)=> {
                const result = await DatabaseFunctions.show_basket();
                res.json(result);
            })
            .get('/items', async (req,res)=> {
                const result = await DatabaseFunctions.select_all();
                res.json(result);
            })
            .post('/check/Hash', async (req,res)=> {
                //password ----> 'SafeBrowserShop1'
                const SALT = 'juasdhiuoasidh&^jhdfijuhsd;uoiyN8aysud* HFASDIUFSADH IUPDSAH*&hgajshdg78608lks'
                const hash = createHmac('sha512', SALT)
                    .update(req.body.password)
                    .digest('hex');
                const requiredHash = await DatabaseFunctions.get_admin_hash()
                if (requiredHash[0].password === hash) {
                    res.status(200)
                } else {
                    res.status(400);
                }
                res.end()
            })
            .post('/addOrder', async (req,res)=> {
                const orders = Object.entries(req.body.orders);
                const user = req.body.user;
                const location = req.body.location;
                const promises = orders.map((arr, i) => {
                    return DatabaseFunctions.insert_order(
                        arr[0],
                        arr[1].amount,
                        arr[1].price,
                        user,
                        location)
                });
                await Promise.all(promises);
                res.end();
            })
            .post('/User', async (req,res)=> {
                const activeUsers = await DatabaseFunctions.get_users();
                let userAlreadyExists = false;
                activeUsers.forEach((user) => {
                    if (req.body.user === user.user) {
                        userAlreadyExists = true;
                        return;
                    }})
                })

            .get('/User', async (req,res)=> {
                const answer = await DatabaseFunctions.get_users();
                res.json(answer);
                return answer;
            })
            .post('/User/login', async (req,res)=> {
                const loggingUser = req.body.user;
                const loggingPassword = req.body.password;
                const activeUsers = await DatabaseFunctions.get_users();
                activeUsers.forEach((user) => {
                    if (loggingUser === user.user) {
                        if (loggingPassword === user.password) {
                            console.log('ta');
                            res.status(200).end();
                        }
                    }
                });
            });

module.exports = {
    mainRouter
}


