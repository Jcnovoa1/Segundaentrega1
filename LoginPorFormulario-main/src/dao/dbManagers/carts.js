import {cartsModel} from "../models/cartsModel.js";
export default class Carts {
    constructor() {
        console.log('Working carts with DB in mongoDB')
    }

    getCarts = async () => {
        const carts = await cartsModel.find().populate('products.product')
        return carts
    }

    getById = async(cid) => {
        const searchedCart = await cartsModel.findOne({_id:cid});
        if (!searchedCart || searchedCart.length == 0) {
            return 'Cart not found';
        }
        return searchedCart;
    }

    getCartById = async (cid) => {
        const result = await cartsModel.findOne({
            "_id": cid
        }).populate('products.product')
        if(!result || result.length == 0) {
            return 'Cart not found'
        }
        return result
    }

    addCart = async (cart) => {
        const result = await cartsModel.create(cart)
        return result
    }

    addProductInCart = async (cid, pid) => {
        // const cartToUpdate = await cartsModel.findOne({_id: cid})
        const cartToUpdate = await this.getById(cid)

        if(!cid || !pid) return console.log('cid or pid undefined')

        const addPost = async (post) =>{
            const existingPost = cartToUpdate.products.find(p => p.product == post);
            if (existingPost) {

                // Actualizar post existente
                existingPost.product = pid;

                existingPost.quantity += 1;

                let result = await cartsModel.updateOne({_id: cid}, cartToUpdate)

                return result
            } else {

                // Agregar nuevo post
                cartToUpdate.products.push({
                    product: post,
                    quantity:1
                })
                let result = await cartsModel.updateOne({_id: cid}, cartToUpdate)
                return result
            }
        }
        addPost(pid)
    }

    update = async (cid,newprods) =>{
        let result = await cartsModel.updateOne({_id: cid},{products:newprods});
        return result;
    }


    deleteProductInCart = async (cid, pid) => {
        const cart = await this.getById(cid)
        let oldProducts = cart.products;
        let newProducts = oldProducts.filter((prod) => String(prod.product) !== pid);
        this.update(cid, newProducts)
    }

    deleteCart = async(cid) => {
        const cart = await this.getById(cid)
        const cartObject = cart.toObject()
        console.log(cartObject)
        const newCart = {...cartObject._id, products:[]}
        const result = cartsModel.updateOne({_id: cid}, newCart)
        return result
    }

    updateQuantity = async(cid, pid, quantity) => {
        const cartToUpdate = await this.getById(cid)

        const find = cartToUpdate.products.find(p => p.product == pid)

        find.quantity = quantity.quantity

        const result = cartsModel.updateOne({_id: cid }, cartToUpdate)

        return result

    }

    updateCart = async(cid, newCart) => {
        const result = await cartsModel.updateOne({_id: cid}, newCart)
    }
}






