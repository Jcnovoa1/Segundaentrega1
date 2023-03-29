import { Router } from 'express'
import Carts from '../../dao/dbManagers/carts.js'

const cartsManager = new Carts()
const router = Router()

router.get('/', async (req, res) => {
    try {
        const carts = await cartsManager.getCarts()
        res.send({status: 'success', payload: carts})
    } catch (error) {
        res.status(500).send({ error })
    }
})

router.post('/', async (req, res) => {
    const cart = req.body
    try {
        const result = await cartsManager.addCart(cart)
        res.send({status: 'success', payload: result})
    } catch (error) {
        res.status(500).send({ error })
    }
})

router.get('/:cid', async (req, res) => {
    const cid = req.params.cid
    try {
        const result = await cartsManager.getCartById(cid)
        res.send({status: 'success', payload: result})
    } catch (error) {
        res.status(500).send({ error })
    }
})

router.post('/:cid/products/:pid', async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    try {
        const result = await cartsManager.addProductInCart(cid, pid)
        res.send({status: 'success', message: 'The product with id ' + pid + ' was added successfully from cart ' + cid + '', payload:result})
    } catch (error) {
        res.status(500).send({error: 'el error es ' + error})
    }

})

router.delete('/:cid/products/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    try {
        await cartsManager.deleteProductInCart(cid, pid)
        res.send({status: 'success', message: 'The product with id ' + pid + ' was deleted successfully from cart ' + cid + ''})
    } catch (error) {
        res.status(500).send({error: 'el error es ' + error})
    }

});

router.delete('/:cid', async (req, res) => {
    const cid = req.params.cid
    try {
        const result = await cartsManager.deleteCart(cid)
        res.send({status: 'success', message: 'The cart with id '+ cid + 'was deleted successfully', payload: result})
    } catch (error) {
        // console.log(error)
        res.status(500).send({error: 'el error es ' + error})
    }
})
router.put('/:cid/products/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body
    try {
        const result = await cartsManager.updateQuantity(cid, pid, quantity)
        res.send({status: 'success', message: 'The product with id ' + pid + ' was changed it quantity from cart ' + cid + '', payload: result})
    } catch (error) {
        // console.log(error)
        res.status(500).send({error: 'el error es ' + error})
    }
})

router.put('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const products = req.body;
    const result = cartsManager.updateCart(cartId,products)
        res.send({status: 'success',message: 'The cart with id ' + cartId + ' was updated successfully with the required products.'});
        });



export default router